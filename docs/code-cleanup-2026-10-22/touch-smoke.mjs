import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

// agent-browser owns the browser. CDP supplements the CLI's viewport-only device
// emulation with actual touch input, without adding a browser dependency.
const endpoint = process.env.CODICE_QA_CDP;
if (!endpoint) throw new Error('Set CODICE_QA_CDP to the current agent-browser get cdp-url result.');
const socket = new WebSocket(endpoint);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let sequence = 0;
const pending = new Map();
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  clearTimeout(request.timeout);
  if (message.error) request.reject(new Error(JSON.stringify(message.error)));
  else request.resolve(message.result);
});

function send(method, params = {}, sessionId) {
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`CDP timed out: ${method}`));
    }, 15000);
    pending.set(id, { resolve, reject, timeout });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
}

try {
  const { targetInfos } = await send('Target.getTargets');
  const target = targetInfos.find(candidate => candidate.type === 'page' && candidate.url === 'http://localhost:4321/');
  assert.ok(target, 'the agent-browser tab must be on the local landing');
  const { sessionId } = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const evaluate = async expression => {
    const response = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
    if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
    return response.result.value;
  };
  const waitForMenu = expected => evaluate(`new Promise((resolve, reject) => {
    const deadline = performance.now() + 3000;
    const check = () => {
      if (document.querySelector('.nav-menu').open === ${expected}) return resolve(true);
      if (performance.now() > deadline) return reject(new Error('Menu did not reach the requested touch state'));
      requestAnimationFrame(check);
    };
    check();
  })`);
  const tapMenu = async () => {
    const point = await evaluate(`(() => {
      const rectangle = document.querySelector('.nav-menu summary').getBoundingClientRect();
      return { x: rectangle.x + rectangle.width / 2, y: rectangle.y + rectangle.height / 2 };
    })()`);
    await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...point, id: 1 }] }, sessionId);
    await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }, sessionId);
  };

  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 }, sessionId);
  const device = await evaluate(`({
    touchPoints: navigator.maxTouchPoints,
    coarsePointer: matchMedia('(pointer: coarse)').matches,
    viewport: [innerWidth, innerHeight],
  })`);
  assert.ok(device.touchPoints > 0, 'touch emulation was not enabled');
  assert.equal(device.coarsePointer, true);
  assert.equal(await evaluate("document.querySelector('.nav-menu').open"), false);
  await tapMenu();
  const openedWithTouch = await waitForMenu(true);
  await tapMenu();
  const closedWithTouch = await waitForMenu(false);
  const story = await evaluate(await readFile(new URL('./mobile-stops.browser.js', import.meta.url), 'utf8'));
  assert.ok(story.touchPoints > 0, 'touch emulation must remain enabled during the story check');
  const report = { ...device, openedWithTouch, closedWithTouch, story };
  await writeFile(new URL('./touch-smoke.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  socket.close();
}
