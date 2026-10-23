import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const { webkit } = await import(pathToFileURL(process.env.CODICE_QA_PLAYWRIGHT).href);
const browser = await webkit.launch({ headless: true, executablePath: process.env.CODICE_QA_WEBKIT_EXECUTABLE });
const results = [];
try {
  for (const disableAnchoring of [false, true]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
    await context.addInitScript(() => {
      window.__scrollCalls = [];
      for (const name of ['scrollTo', 'scrollBy']) {
        const original = window[name];
        window[name] = function (...arguments_) {
          window.__scrollCalls.push({ name, arguments_, at: performance.now(), stack: new Error().stack });
          return original.apply(this, arguments_);
        };
      }
      addEventListener('scroll', () => window.__scrollCalls.push({ event: 'scroll', y: scrollY, at: performance.now() }), { passive: true });
    });
    if (disableAnchoring) await context.route('**/*.css', async route => {
      const response = await route.fetch();
      await route.fulfill({ response, body: await response.text() + '\n.people-hero { overflow-anchor: none !important; }' });
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4321/');
    await page.waitForFunction(() => document.querySelector('.people-hero').dataset.mode === 'scroll');
    await page.evaluate(() => {
      const hero = document.querySelector('.people-hero');
      scrollTo({ top: hero.offsetTop + (hero.offsetHeight - innerHeight) * .5, behavior: 'instant' });
    });
    await page.waitForFunction(() => document.querySelector('.person-card[data-active=true] .person-name').getAttribute('aria-label') === 'Victor Rafael');
    const before = await page.evaluate(() => ({ y: scrollY, restoration: history.scrollRestoration, anchoringSupported: CSS.supports('overflow-anchor', 'none') }));
    await page.reload();
    await page.waitForTimeout(1000);
    const after = await page.evaluate(() => ({ y: scrollY, calls: window.__scrollCalls, name: document.querySelector('.person-card[data-active=true] .person-name').getAttribute('aria-label') }));
    results.push({ disableAnchoring, before, after });
    await context.close();
  }
  await writeFile(new URL('./restoration-diagnostic.json', import.meta.url), JSON.stringify(results, null, 2) + '\n');
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
