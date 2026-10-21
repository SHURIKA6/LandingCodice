async (page) => {
  // Run with Playwright MCP browser_run_code_unsafe.filename against the local
  // production preview. No external links are followed and no messages sent.
  const base = new URL(page.url()).origin;
  const browser = page.context().browser();
  const results = [];
  try {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const open = async (options = {}, setup) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference', ...options });
    if (setup) await setup(context);
    const current = await context.newPage();
    const errors = [];
    current.on('pageerror', error => errors.push(error.message));
    await current.goto(base);
    await current.locator('#hero-title').waitFor();
    return { context, current, errors };
  };
  const hydrated = p => p.waitForFunction(() => !!document.documentElement.dataset.scrollEngine);
  const three = p => p.waitForFunction(() => document.querySelector('.people-hero').dataset.renderer === 'three');
  const staticHTML = p => p.locator('.people-hero[data-mode="static"]').waitFor({ state: 'attached' });

  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    const { context, current: p, errors } = await open({ viewport: { width, height: width < 768 ? 844 : 1000 } });
    try {
      await hydrated(p);
      if (width >= 1024) await three(p);
      else await p.waitForFunction(() => ['mobile-story', 'mobile-flow'].includes(document.querySelector('.people-hero').dataset.motionMode));
      if (width === 390) {
        assert(await p.locator('.people-stage').evaluate(node => getComputedStyle(node).position === 'sticky'), 'mobile stage did not pin');
        assert(await p.locator('.portrait-progress').count() === 1, 'mobile progress missing');
        results.push({ scenario: 'mobile-pinned-story', pass: true });
      }
      await p.locator('.roger-media').scrollIntoViewIfNeeded();
      await p.waitForFunction(() => [...document.querySelectorAll('.roger-media img')].every(image => image.complete && image.naturalWidth > 0));
      const layout = await p.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        names: [...document.querySelectorAll('.person-name')].map(node => node.getAttribute('aria-label')),
        renderer: document.querySelector('.people-hero').dataset.renderer,
        contacts: [...document.querySelectorAll('a[href^="https://wa.me/"]')].map(node => new URL(node.href).pathname.slice(1)),
      }));
      assert(layout.scrollWidth <= layout.width + 1, `horizontal overflow at ${width}: ${JSON.stringify(layout)}`);
      assert(layout.names.join('|') === 'Fernando Riad|Eduardo Gobatto|Victor Rafael', 'team identity or order changed');
      assert(layout.contacts.every(number => ['5566999356646', '556684184488'].includes(number)), 'unknown commercial contact');
      assert(errors.length === 0, `runtime errors at ${width}: ${errors}`);
      results.push({ scenario: `layout-${width}`, renderer: layout.renderer, pass: true });
    } finally { await context.close(); }
  }

  let optionalChunk;
  {
    const { context, current: p, errors } = await open();
    try {
      await three(p);
      const html = await (await p.request.get(base)).text();
      const initial = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match => new URL(match[1], base).href);
      const scripts = await p.evaluate(() => [...document.scripts].map(script => script.src).filter(Boolean));
      optionalChunk = scripts.find(source => !initial.includes(source) && source.includes('/_next/static/chunks/'));
      assert(optionalChunk, 'optional scene chunk was not split from initial hydration');
      const stops = [];
      for (const progress of [0, 0.25, 0.5, 0.75, 1, 0.5, 0]) {
        await p.evaluate(value => {
          const hero = document.querySelector('.people-hero');
          scrollTo({ top: hero.getBoundingClientRect().top + scrollY + (hero.offsetHeight - innerHeight) * value, behavior: 'instant' });
        }, progress);
        await p.waitForTimeout(300);
        stops.push(await p.locator('.person-card[data-active=true] .person-name').getAttribute('aria-label'));
      }
      assert(stops.join('|') === 'Fernando Riad|Eduardo Gobatto|Eduardo Gobatto|Victor Rafael|Victor Rafael|Eduardo Gobatto|Fernando Riad', `scroll sequence: ${stops}`);
      await p.evaluate(() => { const hero = document.querySelector('.people-hero'); scrollTo({ top: (hero.offsetHeight - innerHeight) * 0.5, behavior: 'instant' }); });
      await p.waitForFunction(() => document.querySelector('.person-card[data-active=true] .person-name').getAttribute('aria-label') === 'Eduardo Gobatto');
      await p.reload(); await three(p);
      await p.waitForFunction(() => document.querySelector('.person-card[data-active=true] .person-name').getAttribute('aria-label') === 'Eduardo Gobatto');
      results.push({ scenario: 'reload-at-middle-portrait', pass: true });
      await p.getByRole('button', { name: 'Catálogo e filtros' }).click();
      await p.waitForFunction(() => document.querySelector('.project-capture-next')?.getAttribute('aria-hidden') === 'false');
      assert((await p.locator('.project-capture[aria-hidden="false"]').getAttribute('src')).includes('catalog'), 'catalogue control failed');
      await p.getByRole('button', { name: 'Apresentação', exact: true }).click();
      assert((await p.locator('.project-capture[aria-hidden="false"]').getAttribute('src')).includes('poster'), 'presentation control failed');
      const menu = p.locator('.nav-menu summary');
      await menu.focus(); await p.keyboard.press('Enter');
      assert(await p.locator('.nav-menu').getAttribute('open') !== null, 'keyboard menu did not open');
      await p.keyboard.press('Escape');
      assert(await menu.evaluate(node => document.activeElement === node), 'Escape did not return menu focus');
      assert(await p.locator('.nav-menu').getAttribute('open') === null, 'Escape did not close menu');
      await p.locator('.button-primary').first().focus();
      assert(await p.locator('.button-primary').first().evaluate(node => getComputedStyle(node).outlineColor === getComputedStyle(document.body).color), 'primary focus outline lost contrast against the light page');
      assert(errors.length === 0, `interaction runtime errors: ${errors}`);
      results.push({ scenario: 'scroll-forward-reverse-catalogue-keyboard', stops, pass: true });

      await p.setViewportSize({ width: 390, height: 844 }); await p.waitForFunction(() => document.querySelector('.people-hero').dataset.motionMode === 'mobile-story');
      await p.setViewportSize({ width: 1440, height: 1000 });
      await p.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await three(p);
      await p.emulateMedia({ reducedMotion: 'reduce' }); await staticHTML(p);
      await p.evaluate(() => {
        window.__originalRAF = window.requestAnimationFrame;
        window.__pendingFrames = [];
        window.requestAnimationFrame = callback => { window.__pendingFrames.push(callback); return 90000 + window.__pendingFrames.length; };
      });
      await p.emulateMedia({ reducedMotion: 'no-preference' });
      await p.waitForFunction(() => document.querySelector('.people-hero').dataset.mode === 'scroll');
      assert(await p.locator('.people-hero').getAttribute('data-renderer') === 'html', 'remount hides photos before its first frame');
      await p.evaluate(() => { window.requestAnimationFrame = window.__originalRAF; window.__pendingFrames.forEach(callback => requestAnimationFrame(callback)); dispatchEvent(new Event('resize')); });
      await three(p);
      results.push({ scenario: 'resize-live-reduced-motion-remount-first-frame', pass: true });
    } finally { await context.close(); }
  }

  {
    const { context, current: p, errors } = await open({}, async ctx => {
      await ctx.route(optionalChunk, route => route.abort());
    });
    try {
      await hydrated(p); await staticHTML(p);
      await p.getByRole('button', { name: 'Catálogo e filtros' }).click();
      await p.waitForFunction(() => document.querySelector('.project-capture-next')?.getAttribute('aria-hidden') === 'false');
      assert((await p.locator('.project-capture[aria-hidden="false"]').getAttribute('src')).includes('catalog'), 'optional chunk failure blocked the rest of the app');
      assert(errors.length === 0, `uncaught optional chunk failure: ${errors}`);
      results.push({ scenario: 'optional-scene-chunk-failure', pass: true });
    } finally { await context.close(); }
  }

  for (const failure of ['webgl-unavailable', 'texture-error']) {
    const { context, current: p } = await open({}, async ctx => {
      await ctx.addInitScript(kind => {
        if (kind === 'webgl-unavailable') {
          const original = HTMLCanvasElement.prototype.getContext;
          HTMLCanvasElement.prototype.getContext = function (type, ...args) { return /webgl/i.test(type) ? null : original.call(this, type, ...args); };
        } else {
          const original = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
          Object.defineProperty(HTMLImageElement.prototype, 'src', {
            ...original,
            set(value) {
              if (String(value).endsWith('/team/eduardo.jpg') && !this.isConnected) { queueMicrotask(() => this.dispatchEvent(new Event('error'))); return; }
              original.set.call(this, value);
            },
          });
        }
      }, failure);
    });
    try {
      await hydrated(p); await staticHTML(p);
      await p.waitForTimeout(300);
      assert(await p.locator('canvas').count() === 0, `${failure} left the failed renderer mounted`);
      assert(await p.locator('.person-card').count() === 3, `${failure} lost a person`);
      await p.getByRole('button', { name: 'Catálogo e filtros' }).click();
      await p.waitForFunction(() => document.querySelector('.project-capture-next')?.getAttribute('aria-hidden') === 'false');
      assert((await p.locator('.project-capture[aria-hidden="false"]').getAttribute('src')).includes('catalog'), `${failure} blocked interaction`);
      results.push({ scenario: failure, pass: true });
    } finally { await context.close(); }
  }

  {
    const { context, current: p } = await open();
    try {
      await three(p);
      const supported = await p.locator('canvas').evaluate(canvas => {
        const extension = canvas.getContext('webgl2').getExtension('WEBGL_lose_context');
        if (!extension) return false;
        extension.loseContext(); return true;
      });
      assert(supported, 'cannot exercise context loss in this browser');
      await staticHTML(p);
      assert(await p.locator('canvas').count() === 0, 'context-loss canvas was not released');
      results.push({ scenario: 'webgl-context-loss', pass: true });
    } finally { await context.close(); }
  }

  for (const options of [{ javaScriptEnabled: false }, { reducedMotion: 'reduce' }]) {
    const { context, current: p } = await open(options);
    try {
      if (options.javaScriptEnabled !== false) await hydrated(p);
      await staticHTML(p);
      assert(await p.locator('canvas').count() === 0, 'fallback unexpectedly initialized WebGL');
      for (const name of ['Fernando Riad', 'Eduardo Gobatto', 'Victor Rafael']) assert(await p.getByRole('heading', { name, exact: true, level: 2 }).isVisible(), `fallback lost ${name}`);
      await p.getByRole('link', { name: 'Ver projetos', exact: true }).click();
      // With page JavaScript disabled, use a native anchor and direct inspection;
      // page.waitForFunction's RAF poller is not available in that document.
      await p.waitForTimeout(800);
      assert(await p.locator('#trabalho').evaluate(node => node.getBoundingClientRect().top) < 160, 'native anchor offset obscures the projects');
      assert(await p.locator('#pacote').textContent().then(text => text.includes('R$ 1.500')), 'offer missing in fallback');
      results.push({ scenario: options.javaScriptEnabled === false ? 'no-javascript' : 'reduced-motion-initial', pass: true });
    } finally { await context.close(); }
  }

  return { passed: results.length, results };
  } catch (error) {
    throw new Error(JSON.stringify({ completed: results, error: error.message }));
  }
}
