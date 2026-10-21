async (page) => {
  const browser = page.context().browser();
  const base = new URL(page.url()).origin;
  const evidenceDir = `docs/mobile-motion-2026-10-21/setup/supplemental-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  const results = [];
  const assert = (condition, message, detail) => { if (!condition) throw new Error(`${message}: ${JSON.stringify(detail)}`); };
  const run = async (name, test, options = {}) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, ...options });
    await context.addInitScript(() => {
      window.__qaShift = { supported: PerformanceObserver.supportedEntryTypes.includes('layout-shift'), entries: [] };
      if (window.__qaShift.supported) new PerformanceObserver(list => {
        for (const entry of list.getEntries()) window.__qaShift.entries.push({ time: entry.startTime, value: entry.value, recentInput: entry.hadRecentInput,
          sources: entry.sources?.map(source => source.node?.className).filter(Boolean) });
      }).observe({ type: 'layout-shift', buffered: true });
      const nativeRaf = window.requestAnimationFrame;
      window.__qaRaf = { callbacks: 0, sources: {} };
      window.requestAnimationFrame = callback => nativeRaf.call(window, time => {
        window.__qaRaf.callbacks++;
        const source = String(callback).slice(0, 120);
        window.__qaRaf.sources[source] = (window.__qaRaf.sources[source] || 0) + 1;
        callback(time);
      });
    });
    const p = await context.newPage();
    const errors = [];
    p.on('pageerror', error => errors.push(error.message));
    try {
      await p.goto(base, { waitUntil: 'networkidle' });
      await p.waitForFunction(() => document.querySelector('.people-hero')?.dataset.motionMode === 'mobile-story');
      const detail = await test(p, context);
      assert(errors.length === 0, 'Page errors', errors);
      results.push({ name, pass: true, ...detail });
    } catch (error) {
      const fs = await import('node:fs/promises');
      await fs.mkdir(evidenceDir, { recursive: true });
      const screenshot = `${evidenceDir}/${name}-failure.png`;
      await p.screenshot({ path: screenshot }).catch(() => {});
      results.push({ name, pass: false, error: String(error), screenshot, errors });
    } finally { await context.close(); }
  };
  const at = async (p, value) => {
    await p.locator('.people-story').evaluate((node, value) => {
      const header = document.querySelector('.site-header').getBoundingClientRect().height;
      scrollTo({ top: node.getBoundingClientRect().top + scrollY - header + (node.offsetHeight - (innerHeight - header)) * value, behavior: 'instant' });
    }, value);
    await p.waitForTimeout(200);
  };

  await run('native-text-adjust-200-percent', async p => {
    const baseline = await p.locator('.person-name').first().evaluate(node => parseFloat(getComputedStyle(node).fontSize));
    await p.addStyleTag({ content: 'html{-webkit-text-size-adjust:200%;text-size-adjust:200%}' });
    await p.waitForTimeout(300);
    const scaled = await p.locator('.person-name').first().evaluate(node => parseFloat(getComputedStyle(node).fontSize));
    const supported = scaled > baseline * 1.8;
    if (!supported) return { supported: false, baseline, scaled, limitation: 'This engine ignored CSS text-size-adjust:200%; this is not proof of native text zoom.' };
    const states = [];
    for (const progress of [.08, .5, .92]) {
      const mode = await p.locator('.people-hero').getAttribute('data-motion-mode');
      if (mode === 'mobile-story') await at(p, progress);
      else await p.locator('.person-card').nth(progress === .08 ? 0 : progress === .5 ? 1 : 2).scrollIntoViewIfNeeded();
      const state = await p.evaluate(() => {
        const cards = [...document.querySelectorAll('.person-card')];
        return { mode: document.querySelector('.people-hero').dataset.motionMode, clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth, innerWidth, visualWidth: visualViewport.width,
          cards: cards.map(card => { const name = card.querySelector('.person-name'), mask = card.querySelector('.person-copy-mask');
            return { name: name.getAttribute('aria-label'), active: card.dataset.active === 'true', nameRect: name.getBoundingClientRect().toJSON(), maskRect: mask.getBoundingClientRect().toJSON(),
              clipped: getComputedStyle(mask).overflow !== 'visible' && getComputedStyle(mask).display !== 'contents' && name.getBoundingClientRect().bottom > mask.getBoundingClientRect().bottom + 1 }; }) };
      });
      states.push(state);
    }
    assert(states.every(state => state.scrollWidth <= state.clientWidth + 1), 'Text enlargement introduced horizontal overflow', states);
    assert(states.every(state => !state.cards.some(card => (state.mode !== 'mobile-story' || card.active) && card.clipped)), 'Text enlargement clipped a complete name', states);
    return { supported, baseline, scaled, method: 'Native CSS text-size-adjust:200%, not physical device accessibility settings.', states };
  });

  await run('simulated-hidden-tab-cancels-and-restores', async p => {
    await p.locator('.package-price').evaluate(node => scrollTo({ top: node.getBoundingClientRect().top + scrollY - innerHeight * .8, behavior: 'instant' }));
    await p.waitForTimeout(40);
    await p.locator('.nav-menu summary').evaluate(node => { node.parentElement.open = true; });
    await p.waitForTimeout(35);
    const before = await p.evaluate(() => ({ running: document.getAnimations().filter(a => a.playState === 'running' || a.pending).length, y: scrollY }));
    assert(before.running > 0, 'No animation was exercised before hiding', before);
    await p.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await p.waitForTimeout(90);
    const hidden = await p.evaluate(() => ({ running: document.getAnimations().filter(a => a.playState === 'running' || a.pending).length, engine: document.documentElement.dataset.scrollEngine, y: scrollY }));
    assert(hidden.running === 0 && hidden.engine === 'native', 'Hidden event retained an animation/Lenis instance', hidden);
    await p.evaluate(() => {
      delete document.hidden; delete document.visibilityState;
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await p.waitForTimeout(150);
    const restored = await p.evaluate(() => ({ engine: document.documentElement.dataset.scrollEngine, y: scrollY, running: document.getAnimations().filter(a => a.playState === 'running' || a.pending).length }));
    assert(restored.engine === 'lenis' && Math.abs(before.y - restored.y) < 2 && restored.running === 0, 'Return from hidden reset position or replayed entries', { before, hidden, restored });
    return { method: 'Getter override plus visibilitychange event; browser-level background throttling was not simulated.', before, hidden, restored };
  });

  await run('idle-effects-and-layout-shift-observation', async p => {
    const samples = [];
    for (const location of ['people', 'offer']) {
      if (location === 'people') await at(p, .5);
      else await p.locator('.package-price').evaluate(node => scrollTo({ top: node.getBoundingClientRect().top + scrollY - innerHeight * .35, behavior: 'instant' }));
      await p.waitForTimeout(1400);
      const state = await p.evaluate(async () => {
        const targets = [...document.querySelectorAll('.person-portrait,.person-copy,.scroll-frame-surface,.chapter-surface,.footer-letter')];
        const before = targets.map(node => getComputedStyle(node).transform);
        const rafBefore = window.__qaRaf.callbacks;
        let styleMutations = 0;
        const observer = new MutationObserver(entries => { styleMutations += entries.filter(entry => entry.attributeName === 'style').length; });
        observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['style'] });
        await new Promise(resolve => setTimeout(resolve, 1200));
        observer.disconnect();
        return { activeAnimations: document.getAnimations().filter(a => a.playState === 'running' || a.pending).length,
          changedTransforms: targets.filter((node, index) => getComputedStyle(node).transform !== before[index]).map(node => node.className),
          styleMutations, rafCallbacks: window.__qaRaf.callbacks - rafBefore, rafSources: window.__qaRaf.sources, cls: window.__qaShift };
      });
      assert(state.activeAnimations === 0 && state.changedTransforms.length === 0 && state.styleMutations === 0, 'Idle decorative activity did not settle', state);
      samples.push({ location, ...state });
    }
    const shift = await p.evaluate(() => window.__qaShift);
    const eligible = shift.entries.filter(entry => !entry.recentInput);
    let maximumSession = 0, sessionValue = 0, sessionStart = 0, previous = 0;
    for (const entry of eligible) {
      if (entry.time - previous > 1000 || entry.time - sessionStart > 5000) { sessionStart = entry.time; sessionValue = 0; }
      sessionValue += entry.value; previous = entry.time; maximumSession = Math.max(maximumSession, sessionValue);
    }
    return { samples, layoutShift: { supported: shift.supported, maximumSession, entries: shift.entries },
      limitation: 'The existing Lenis timing callback remains scheduled while visible. No decorative animation, style mutation or transform change was observed in either 1.2s idle window. These measurements do not establish FPS or performance on a physical device.' };
  });

  await run('native-touch-from-photo-media-and-controls', async (p, context) => {
    let cdp;
    try { cdp = await context.newCDPSession(p); } catch { return { supported: false, limitation: 'CDP touch gesture synthesis is Chromium-only.' }; }
    const gestures = [];
    for (const target of ['photo', 'media', 'controls']) {
      if (target === 'photo') await at(p, .08);
      else await p.locator(target === 'media' ? '.project-browser' : '.view-buttons').evaluate(node => scrollTo({ top: node.getBoundingClientRect().top + scrollY - 260, behavior: 'instant' }));
      await p.waitForTimeout(250);
      const selector = target === 'photo' ? '.person-card[data-active=true] .person-portrait' : target === 'media' ? '.project-browser' : '.view-buttons button';
      const rect = await p.locator(selector).first().boundingBox();
      const x = Math.max(20, Math.min(370, rect.x + rect.width / 2));
      const y = Math.max(100, Math.min(720, rect.y + rect.height / 2));
      const before = await p.evaluate(() => scrollY);
      await p.evaluate(() => {
        window.__qaTouchEvents = [];
        for (const type of ['touchstart', 'touchmove', 'touchend', 'pointercancel']) document.addEventListener(type, event => {
          window.__qaTouchEvents.push({ type, prevented: event.defaultPrevented, target: event.target.className });
        }, { passive: true, once: true });
      });
      await cdp.send('Input.synthesizeScrollGesture', { x, y, yDistance: -260, speed: 650, gestureSourceType: 'touch' });
      await p.waitForTimeout(250);
      const synthesized = await p.evaluate(() => ({ y: scrollY, events: window.__qaTouchEvents }));
      let method = 'Input.synthesizeScrollGesture touch';
      if (synthesized.y <= before + 40 && !synthesized.events.some(event => event.type === 'touchmove')) {
        // This Windows build emits only start/end for synthesizeScrollGesture.
        // Explicit native move packets exercise the browser input pipeline.
        method = 'Input.dispatchTouchEvent: start, 12 moves, end';
        const travel = Math.min(220, y - 90);
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
        for (let step = 1; step <= 12; step++) {
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - travel * step / 12 }] });
          await p.waitForTimeout(20);
        }
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        await p.waitForTimeout(250);
      }
      const after = await p.evaluate(() => scrollY);
      const events = await p.evaluate(() => window.__qaTouchEvents);
      assert(after > before + 40 && events.every(event => !event.prevented), 'Native touch did not scroll from target or was captured', { target, x, y, before, after, events });
      gestures.push({ target, x, y, before, after, delta: after - before, method, synthesized, events });
    }
    const pinchPolicy = await p.evaluate(() => ({ viewport: document.querySelector('meta[name=viewport]')?.content,
      touchActions: [...document.querySelectorAll('html,body,.people-story,.people-stage,.project-browser,.view-buttons')].map(node => ({ target: node.className || node.tagName, value: getComputedStyle(node).touchAction })) }));
    assert(!/user-scalable\s*=\s*no|maximum-scale\s*=\s*1(?:\D|$)/i.test(pinchPolicy.viewport), 'Viewport disables pinch zoom', pinchPolicy);
    assert(pinchPolicy.touchActions.every(item => ['auto', 'manipulation'].includes(item.value) || item.value.includes('pinch-zoom')), 'A scene blocks native pinch gestures', pinchPolicy);
    await cdp.detach();
    return { supported: true, gestures, pinchPolicy, limitation: 'Touch gestures were synthesized by Chromium CDP. Pinch policy was inspected; physical multitouch was not exercised.' };
  });

  const failures = results.filter(result => !result.pass);
  const report = { passed: results.length - failures.length, failed: failures.length, evidenceDir, results };
  if (failures.length) throw new Error(JSON.stringify(report));
  return report;
}
