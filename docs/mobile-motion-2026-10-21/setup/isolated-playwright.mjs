import { createRequire } from 'node:module';
import { readFile, mkdir, writeFile, stat, readdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// QA utility only. Uses an existing local Playwright installation and launches
// a fresh temporary browser profile; it never attaches to a user browser.
const setupDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(setupDir, '../../..');
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const separator = argument.indexOf('=');
  if (!argument.startsWith('--') || separator < 3) throw new Error(`Expected --key=value: ${argument}`);
  return [argument.slice(2, separator), argument.slice(separator + 1)];
}));
const engine = args.engine ?? 'chromium';
if (!['chromium', 'webkit', 'firefox'].includes(engine)) throw new Error(`Unknown engine: ${engine}`);
const packageDir = args.runtime ?? path.resolve(repoRoot, '../Corretor-web/node_modules/playwright');
const requireRuntime = createRequire(path.join(packageDir, 'package.json'));
const playwright = requireRuntime(packageDir);
const packageInfo = JSON.parse(await readFile(path.join(packageDir, 'package.json'), 'utf8'));
const url = args.url ?? 'http://localhost:4321/';
const target = new URL(url);
if (!['localhost', '127.0.0.1', '[::1]'].includes(target.hostname) || target.port !== '4321') {
  throw new Error('This QA runner is restricted to the loopback preview on port 4321.');
}
const label = (args.label ?? 'setup').replace(/[^a-z0-9_-]/gi, '_');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputDir = path.join(setupDir, `${stamp}-${engine}-${label}`);
const videoDir = path.join(outputDir, 'video');
await mkdir(videoDir, { recursive: true });
const report = { startedAt: new Date().toISOString(), engine, packageDir, playwrightVersion: packageInfo.version, url, outputDir, videos: [] };
let browser;
const contexts = [];
const pages = [];
const execFileAsync = promisify(execFile);
const bounded = async (promise, milliseconds, label) => {
  let timer;
  try {
    return await Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded ${milliseconds} ms`)), milliseconds); })]);
  } finally { clearTimeout(timer); }
};
const saveReport = () => writeFile(path.join(outputDir, 'result.json'), JSON.stringify(report, null, 2) + '\n');
const stopOwnedBrowserChildren = async () => {
  // Only descendants of this runner, with executables in the Playwright cache,
  // can be terminated. User browsers and the preview server are unrelated.
  const cacheRoot = path.join(process.env.LOCALAPPDATA, 'ms-playwright') + path.sep;
  const script = `$qaRootId = ${process.pid}\n$qaCache = '${cacheRoot.replace(/'/g, "''")}'\n$qaProcesses = @(Get-CimInstance Win32_Process)\n$qaOwned = [System.Collections.Generic.HashSet[int]]::new()\n[void]$qaOwned.Add($qaRootId)\ndo { $qaChanged = $false; foreach ($qaProcess in $qaProcesses) { if ($qaOwned.Contains([int]$qaProcess.ParentProcessId) -and $qaOwned.Add([int]$qaProcess.ProcessId)) { $qaChanged = $true } } } while ($qaChanged)\nforeach ($qaProcess in $qaProcesses) { if ($qaProcess.ProcessId -ne $qaRootId -and $qaOwned.Contains([int]$qaProcess.ProcessId) -and $qaProcess.ExecutablePath -and $qaProcess.ExecutablePath.StartsWith($qaCache, [System.StringComparison]::OrdinalIgnoreCase)) { Stop-Process -Id $qaProcess.ProcessId -Force -ErrorAction SilentlyContinue; Write-Output $qaProcess.ProcessId } }`;
  const result = await execFileAsync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', script], { windowsHide: true, timeout: 10000 });
  return result.stdout.trim().split(/\s+/).filter(Boolean);
};
try {
  const executablePath = playwright[engine].executablePath();
  browser = await playwright[engine].launch({ headless: true, executablePath });
  report.browserVersion = browser.version();
  report.executablePath = executablePath;
  const originalNewContext = browser.newContext.bind(browser);
  // Existing browser scenarios create additional contexts through
  // page.context().browser(); record these as well, without editing them.
  browser.newContext = async (options = {}) => {
    const context = await originalNewContext({ recordVideo: { dir: videoDir, size: options.viewport ?? { width: 390, height: 844 } }, ...options });
    contexts.push(context);
    context.on('page', page => pages.push(page));
    return context;
  };
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 1,
    isMobile: true, hasTouch: true, reducedMotion: 'no-preference',
  });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  report.status = response?.status();
  if (report.status !== 200) throw new Error(`Preview returned HTTP ${report.status}`);
  await page.locator('#hero-title').waitFor();
  if (args.scenario) {
    const scenarioPath = path.resolve(repoRoot, args.scenario);
    const source = await readFile(scenarioPath, 'utf8');
    // Scenarios are trusted local repository files containing an async (page)
    // expression, matching the existing MCP browser script convention.
    const scenario = new Function(`return (${source.trim().replace(/;\s*$/, '')})`)();
    if (typeof scenario !== 'function') throw new Error('Scenario must evaluate to a function.');
    report.scenario = scenarioPath;
    report.result = await scenario(page);
  } else {
    await page.waitForFunction(() => Boolean(document.documentElement.dataset.scrollEngine));
    report.initial = await page.evaluate(() => ({
      title: document.title,
      heroMode: document.querySelector('.people-hero')?.getAttribute('data-mode'),
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    await page.screenshot({ path: path.join(outputDir, 'opening.png') });
    for (const y of [350, 750, 1200, 750, 0]) {
      await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
      await page.waitForTimeout(350);
    }
    await page.screenshot({ path: path.join(outputDir, 'returned.png') });
  }
  report.pageErrors = pageErrors;
  if (pageErrors.length) throw new Error(`Page errors: ${pageErrors.join('; ')}`);
  report.pass = true;
} catch (error) {
  report.pass = false;
  report.error = error.stack ?? String(error);
  process.exitCode = 1;
} finally {
  report.testFinishedAt = new Date().toISOString();
  // Persist the behavioral result before browser shutdown: Windows WebKit can
  // finish all pages/videos and still stall in close(). Cleanup is separate.
  await saveReport();
  report.cleanupWarnings = [];
  for (const context of contexts) {
    try { await bounded(context.close(), 6000, 'context.close'); }
    catch (error) { report.cleanupWarnings.push(String(error)); }
  }
  if (browser) {
    try { await bounded(browser.close(), 8000, 'browser.close'); }
    catch (error) {
      report.cleanupWarnings.push(String(error));
      try { report.terminatedOwnedBrowserChildren = await stopOwnedBrowserChildren(); }
      catch (cleanupError) { report.cleanupWarnings.push(String(cleanupError)); }
    }
  }
  // Video paths are already materialized after context shutdown. Reading the
  // directory avoids awaiting a remote artifact promise after a stalled close.
  for (const file of await readdir(videoDir)) {
    const videoPath = path.join(videoDir, file);
    if (file.endsWith('.webm')) report.videos.push({ path: videoPath, bytes: (await stat(videoPath)).size });
  }
  report.finishedAt = new Date().toISOString();
  await saveReport();
  console.log(JSON.stringify({ engine, pass: report.pass, passed: report.result?.passed, failed: report.result?.failed, outputDir, videos: report.videos.length, cleanupWarnings: report.cleanupWarnings, error: report.error }, null, 2));
}
