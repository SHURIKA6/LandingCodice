import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Reuses an external QA installation, never the application's dependencies.
const modulePath = process.env.CODICE_QA_PLAYWRIGHT;
if (!modulePath) throw new Error('Set CODICE_QA_PLAYWRIGHT to the installed Playwright index.mjs.');
const { chromium, webkit } = await import(pathToFileURL(resolve(modulePath)).href);
const engine = process.argv[2] || 'chromium';
const suite = process.argv[3] || 'cinematic';
const suitePaths = {
  people: 'scripts/verify-people.browser.js',
  motion: 'scripts/verify-motion.browser.js',
  cinematic: 'scripts/verify-cinematic.browser.js',
};
if (!suitePaths[suite] || !['chromium', 'webkit'].includes(engine)) throw new Error('Choose chromium/webkit and people/motion/cinematic.');
const browser = engine === 'chromium'
  ? process.env.CODICE_QA_CDP ? await chromium.connectOverCDP(process.env.CODICE_QA_CDP) : await chromium.launch({ headless: true })
  : await webkit.launch({ headless: true, ...(process.env.CODICE_QA_WEBKIT_EXECUTABLE ? { executablePath: process.env.CODICE_QA_WEBKIT_EXECUTABLE } : {}) });
const createContext = browser.newContext.bind(browser);
browser.newContext = async (...options) => {
  const context = await createContext(...options);
  context.on('page', current => {
    const waitForFunction = current.waitForFunction.bind(current);
    current.waitForFunction = async (...arguments_) => {
      try { return await waitForFunction(...arguments_); }
      catch (error) {
        const state = await current.evaluate(() => ({
          scroll: scrollY, viewport: [innerWidth, innerHeight],
          hero: document.querySelector('.people-hero')?.outerHTML.slice(0, 250),
          active: document.querySelector('.person-card[data-active=true] .person-name')?.getAttribute('aria-label'),
          engine: document.documentElement.dataset.scrollEngine,
          text: document.body.innerText.slice(0, 250),
        })).catch(() => null);
        await writeFile(new URL(`./${engine}-${suite}-wait-failure.json`, import.meta.url), JSON.stringify({ expression: String(arguments_[0]), stack: error.stack, state }, null, 2) + '\n');
        throw error;
      }
    };
  });
  return context;
};
const context = await browser.newContext();
const page = await context.newPage();
let failed = false;
try {
  await page.goto('http://localhost:4321/');
  const exercise = (0, eval)(`(${await readFile(suitePaths[suite], 'utf8')})`);
  const results = await exercise(page);
  const report = { engine, browserVersion: browser.version(), suite, ...results };
  await writeFile(new URL(`./${engine}-${suite}.json`, import.meta.url), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  failed = true;
  const report = { engine, suite, failed: true, message: error.message };
  await writeFile(new URL(`./${engine}-${suite}-failure.json`, import.meta.url), JSON.stringify(report, null, 2) + '\n');
  console.error(error);
} finally {
  await context.close();
  await browser.close();
}
process.exitCode = failed ? 1 : 0;
