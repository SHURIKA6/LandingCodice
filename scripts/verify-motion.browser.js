async (page) => {
  const base = new URL(page.url()).origin;
  const browser = page.context().browser();
  const results = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const run = async (scenario, exercise, options = {}, setup) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference', ...options });
    try {
      if (setup) await setup(context);
      const p = await context.newPage();
      const errors = [];
      p.on('pageerror', error => errors.push(error.message));
      await p.goto(base);
      await p.waitForFunction(() => !!document.documentElement.dataset.scrollEngine);
      const evidence = await exercise(p, context);
      assert(errors.length === 0, `runtime errors: ${errors}`);
      results.push({ scenario, pass: true, ...evidence });
    } finally { await context.close(); }
  };
  const catalog = p => p.waitForFunction(() => document.querySelector('.project-capture-next')?.getAttribute('aria-hidden') === 'false');
  const scrollTo = (p, selector, viewportTop = 150) => p.evaluate(({ selector, viewportTop }) => {
    const target = document.querySelector(selector);
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - viewportTop, behavior: 'instant' });
  }, { selector, viewportTop });

  try {
    await run('scroll-frame-reversible-and-chapter-arrival', async p => {
      const matrix = () => p.locator('.scroll-frame-surface').first().evaluate(node => {
        const matrix = new DOMMatrix(getComputedStyle(node).transform);
        return { scale: Math.hypot(matrix.a, matrix.b), y: matrix.f };
      });
      const before = await matrix();
      await p.locator('.scroll-frame').first().evaluate(node => {
        window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY + node.offsetHeight / 2 - window.innerHeight / 2, behavior: 'instant' });
      });
      await p.waitForFunction(() => {
        const matrix = new DOMMatrix(getComputedStyle(document.querySelector('.scroll-frame-surface')).transform);
        return Math.hypot(matrix.a, matrix.b) > .995;
      });
      const settled = await matrix();
      await scrollTo(p, '.scroll-frame', 950);
      await p.waitForFunction(() => {
        const matrix = new DOMMatrix(getComputedStyle(document.querySelector('.scroll-frame-surface')).transform);
        return Math.hypot(matrix.a, matrix.b) < .98;
      });
      const reversed = await matrix();
      assert(before.scale < settled.scale && reversed.scale < settled.scale, 'project no longer follows scroll in both directions');
      await scrollTo(p, '#contato', 900);
      await p.waitForFunction(() => parseFloat(getComputedStyle(document.querySelector('#contato')).borderTopLeftRadius) > 30);
      const round = await p.locator('#contato').evaluate(node => parseFloat(getComputedStyle(node).borderTopLeftRadius));
      await scrollTo(p, '#contato', 100);
      await p.waitForFunction(() => parseFloat(getComputedStyle(document.querySelector('#contato')).borderTopLeftRadius) < 2);
      return { before, settled, reversed, contactRadiusOnArrival: round };
    });

    await run('chapter-animation-cancelled-by-live-reduced-motion', async (p, context) => {
      await scrollTo(p, '#contato', 350);
      await p.waitForFunction(() => document.getAnimations().some(animation => animation.effect instanceof KeyframeEffect && animation.effect.target?.closest('#contato')));
      await p.emulateMedia({ reducedMotion: 'reduce' });
      await p.waitForFunction(() => document.querySelector('#contato').dataset.motion === 'false');
      const state = await p.evaluate(() => ({
        animations: document.getAnimations().filter(animation => animation.playState === 'running').length,
        engine: document.documentElement.dataset.scrollEngine,
        radius: getComputedStyle(document.querySelector('#contato')).borderTopLeftRadius,
        frames: [...document.querySelectorAll('.scroll-frame-surface')].map(node => getComputedStyle(node).transform),
        canvas: document.querySelectorAll('canvas').length,
      }));
      assert(state.animations === 0 && state.engine === 'native' && state.radius === '0px' && state.canvas === 0, `reduced motion left effects running: ${JSON.stringify(state)}`);
      assert(state.frames.every(transform => transform === 'none'), 'reduced motion retained transformed project frames');
      return state;
    });

    let releaseCatalog;
    const catalogGate = new Promise(resolve => { releaseCatalog = resolve; });
    await run('slow-catalogue-keeps-old-photo-and-last-selection', async p => {
      try {
        // Establish the currently displayed pixels before testing a replacement.
        // The presentation is lazy-loaded when its media first enters the view.
        await p.locator('.project-browser').scrollIntoViewIfNeeded();
        // decode() rejects while a lazy image has not started loading, so wait for its pixels first.
        await p.waitForFunction(() => { const image = document.querySelector('.project-capture-base'); return image?.complete && image.naturalWidth > 0; });
        await p.locator('.project-capture-base').evaluate(image => image.decode());
        await p.getByRole('button', { name: 'Catálogo e filtros' }).click();
        await p.waitForFunction(() => document.querySelector('.project-screen').getAttribute('aria-busy') === 'true');
        assert(await p.locator('.project-capture-base').getAttribute('aria-hidden') === 'false', 'slow load erased the current photograph');
        assert(await p.locator('.project-capture-base').evaluate(node => getComputedStyle(node).opacity === '1' && node.complete && node.naturalWidth > 0), 'loading fallback has no pixels');
        await p.getByRole('button', { name: 'Apresentação', exact: true }).click();
        releaseCatalog();
        await p.waitForFunction(() => { const image = document.querySelector('.project-capture-next'); return image?.complete && image.naturalWidth > 0; });
        assert(await p.locator('.project-capture-base').getAttribute('aria-hidden') === 'false', 'late decode overwrote the latest choice');
        await p.getByRole('button', { name: 'Catálogo e filtros' }).click();
        await catalog(p);
        await p.waitForFunction(() => {
          const opacity = parseFloat(getComputedStyle(document.querySelector('.project-capture-next')).opacity);
          return opacity > 0 && opacity < 1;
        }, { polling: 'raf' });
        await p.emulateMedia({ reducedMotion: 'reduce' });
        const duration = await p.locator('.project-capture-next').evaluate(node => getComputedStyle(node).transitionDuration);
        assert(duration === '0s', 'crossfade did not stop under reduced motion');
        return { oldPhotoDuringDownload: true, latestChoicePreserved: true, intermediateOpacityObserved: true };
      } finally { releaseCatalog(); }
    }, {}, async context => {
      await context.route('**/media/corretor-catalog.webp', async route => { await catalogGate; await route.continue(); });
    });

    let requests = 0;
    await run('catalogue-error-retry-and-rapid-toggle', async p => {
      await p.getByRole('button', { name: 'Catálogo e filtros' }).click();
      await p.waitForFunction(() => document.querySelector('.view-buttons button').getAttribute('aria-pressed') === 'true');
      assert(await p.locator('.project-capture-base').getAttribute('aria-hidden') === 'false', 'download error lost presentation');
      await p.getByRole('button', { name: 'Catálogo e filtros' }).click();
      await catalog(p);
      for (let index = 0; index < 3; index++) {
        await p.getByRole('button', { name: 'Apresentação', exact: true }).click();
        await p.getByRole('button', { name: 'Catálogo e filtros' }).click();
      }
      await catalog(p);
      assert(await p.locator('.project-controls [aria-live]').textContent().then(text => text.includes('Filtros')), 'description is not aligned with displayed photograph');
      assert(await p.locator('.project-screen').getAttribute('aria-busy') === 'false', 'loading state never cleared');
      return { requests, rapidRoundTrips: 3 };
    }, {}, async context => {
      await context.route('**/media/corretor-catalog.webp', async route => { requests++; if (requests === 1) await route.abort(); else await route.continue(); });
    });

    await run('keyboard-focus-cancels-entrance-and-menu-remains-native', async p => {
      await p.evaluate(() => {
        const founder = document.querySelector('.founder');
        window.scrollTo({ top: founder.getBoundingClientRect().top + window.scrollY - 300, behavior: 'instant' });
        founder.querySelector('a').focus({ preventScroll: true });
      });
      const focus = await p.locator('.founder').first().evaluate(node => ({ opacity: getComputedStyle(node).opacity, transform: getComputedStyle(node).transform, active: node.contains(document.activeElement) }));
      assert(focus.active && focus.opacity === '1' && focus.transform === 'none', `keyboard contact obscured: ${JSON.stringify(focus)}`);
      const menu = p.locator('.nav-menu summary');
      await menu.focus(); await p.keyboard.press('Enter');
      await p.keyboard.press('Tab');
      assert(await p.getByRole('link', { name: 'A gente', exact: true }).evaluate(node => node === document.activeElement), 'menu link not reachable immediately');
      await p.keyboard.press('Escape');
      assert(await menu.evaluate(node => node === document.activeElement), 'Escape focus lost');
      return { contactFocusVisibleDuringArrival: true, menuImmediateKeyboardAccess: true };
      // From 1025 px the header shows inline links instead of the menu button, so this runs just below it.
    }, { viewport: { width: 1000, height: 900 } });

    await run('mobile-touch-menu-anchor-catalogue-and-moving-media', async p => {
      await p.locator('.nav-menu summary').tap();
      await p.getByRole('link', { name: 'Seu site', exact: true }).tap();
      await p.waitForFunction(() => Math.abs(document.querySelector('#pacote').getBoundingClientRect().top - 86) < 5);
      assert(await p.locator('canvas').count() === 0, 'mobile downloaded a scene');
      await p.getByRole('button', { name: 'Catálogo e filtros' }).tap(); await catalog(p);
      assert(await p.locator('.project-controls').evaluate(node => !node.closest('.scroll-frame-surface')), 'catalogue controls move with media');
      assert(await p.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), 'touch layout overflow');
      return { width: 390, touch: true, controlsOutsideMovingMedia: true };
    }, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

    return { passed: results.length, results };
  } catch (error) {
    throw new Error(JSON.stringify({ completed: results, error: error.message }));
  }
}
