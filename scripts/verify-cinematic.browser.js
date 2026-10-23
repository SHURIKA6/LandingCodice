async (page) => {
  const browser = page.context().browser();
  const base = new URL(page.url()).origin;
  const results = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const run = async (scenario, exercise, options = {}, setup) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference', ...options });
    try {
      if (setup) await setup(context);
      const current = await context.newPage();
      const errors = [];
      current.on('pageerror', error => errors.push(error.message));
      await current.goto(base);
      if (options.javaScriptEnabled !== false) await current.waitForFunction(() => !!document.documentElement.dataset.scrollEngine);
      const evidence = await exercise(current, context);
      assert(!errors.length, `runtime errors: ${errors.join(' | ')}`);
      results.push({ scenario, pass: true, ...evidence });
    } finally { await context.close(); }
  };
  const scrollTo = (current, selector, top = 150) => current.locator(selector).first().evaluate((node, top) => {
    window.scrollTo({ top: node.getBoundingClientRect().top + scrollY - top, behavior: 'instant' });
  }, top);
  const transform = (current, selector) => current.locator(selector).first().evaluate(node => getComputedStyle(node).transform);
  const noOverflow = current => current.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  const mobile = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true };

  try {
    await run('opening-background-travels-beneath-the-stable-scrim', async current => {
      const start = await transform(current, '.opening-backdrop');
      await current.evaluate(() => scrollTo({ top: 350, behavior: 'instant' }));
      await current.waitForFunction(() => new DOMMatrix(getComputedStyle(document.querySelector('.opening-backdrop')).transform).f > 10);
      const during = await transform(current, '.opening-backdrop');
      const scrim = await transform(current, '.opening-scrim');
      assert(start !== during && scrim === 'none', 'the background did not move independently of the reading layer');
      await current.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await current.waitForFunction(() => Math.abs(new DOMMatrix(getComputedStyle(document.querySelector('.opening-backdrop')).transform).f) < .1);
      return { start, during, scrim, reversible: true };
    });

    await run('portrait-pointer-renders-on-demand-and-resets-on-blur', async current => {
      await scrollTo(current, '.people-hero', 0);
      await current.waitForFunction(() => document.querySelector('.people-hero').dataset.renderer === 'three');
      await current.evaluate(() => {
        window.__portraitDraws = 0; window.__lastPortraitDraw = 0;
        const draw = WebGL2RenderingContext.prototype.drawElements;
        WebGL2RenderingContext.prototype.drawElements = function (...arguments_) {
          window.__portraitDraws++; window.__lastPortraitDraw = performance.now();
          return draw.apply(this, arguments_);
        };
      });
      const bounds = await current.locator('.hero-sticky').boundingBox();
      await current.mouse.move(bounds.x + bounds.width * .96, bounds.y + bounds.height * .2);
      await current.waitForFunction(() => window.__portraitDraws > 0 && performance.now() - window.__lastPortraitDraw > 350);
      const drawn = await current.evaluate(() => window.__portraitDraws);
      await current.evaluate(() => dispatchEvent(new Event('blur')));
      await current.waitForFunction(previous => window.__portraitDraws > previous && performance.now() - window.__lastPortraitDraw > 350, drawn);
      const afterReset = await current.evaluate(() => window.__portraitDraws);
      // A finite idle sample checks the render budget, not photo-readiness timing.
      await current.waitForTimeout(200);
      assert(await current.evaluate(() => window.__portraitDraws) === afterReset, 'the portrait renderer continued painting at rest');
      return { pointerDraws: drawn, afterReset, noIdleRenderLoop: true };
    });

    await run('four-desktop-stops-counter-and-reverse', async current => {
      await scrollTo(current, '.people-hero', 0);
      await current.waitForFunction(() => document.querySelector('.people-hero').dataset.renderer === 'three');
      const names = [];
      for (const index of [0, 1, 2, 3, 2, 1, 0]) {
        await current.locator('.people-hero').evaluate((node, index) => scrollTo({ top: node.offsetTop + (node.offsetHeight - innerHeight) * index / 3, behavior: 'instant' }), index);
        await current.waitForFunction(index => document.querySelectorAll('.person-card')[index].dataset.active === 'true', index);
        const state = await current.evaluate(() => ({
          name: document.querySelector('.person-card[data-active=true] .person-name').getAttribute('aria-label'),
          reached: document.querySelectorAll('.portrait-progress-stops [data-reached=true]').length,
          counter: document.querySelector('.portrait-counter-roll').style.transform,
          stops: document.querySelectorAll('.portrait-progress-stops > span').length,
        }));
        assert(state.stops === 4 && state.reached === index + 1 && parseFloat(state.counter.slice(11)) === -index * 100, JSON.stringify(state));
        names.push(state.name);
      }
      return { names, stops: 4, counterReverses: true };
    });

    await run('project-tilt-and-controls-stay-independent', async current => {
      await current.locator('.scroll-frame').first().evaluate(node => scrollTo({ top: node.getBoundingClientRect().top + scrollY + node.offsetHeight / 2 - innerHeight / 2, behavior: 'instant' }));
      const frame = current.locator('.scroll-frame').first();
      const controls = await current.locator('.project-controls').boundingBox();
      const bounds = await frame.boundingBox();
      await current.mouse.move(bounds.x + bounds.width * .88, bounds.y + bounds.height * .68);
      await current.waitForFunction(() => {
        const matrix = new DOMMatrix(getComputedStyle(document.querySelector('.scroll-frame-tilt')).transform);
        return Math.abs(matrix.m13) > .005;
      });
      const tilted = await transform(current, '.scroll-frame-tilt');
      assert(JSON.stringify(await current.locator('.project-controls').boundingBox()) === JSON.stringify(controls), 'project controls moved with the painted frame');
      await current.mouse.move(1, 90);
      await current.waitForFunction(() => {
        const matrix = new DOMMatrix(getComputedStyle(document.querySelector('.scroll-frame-tilt')).transform);
        return Math.abs(matrix.m13) < .0001 && Math.abs(matrix.m23) < .0001;
      });
      return { tilted, controlsStable: true, pointerLeaveReturnsToRest: true };
    });

    await run('chapter-seam-skew-copy-and-final-reading-state', async current => {
      await scrollTo(current, '#trabalho', 700);
      await current.waitForFunction(() => Number(document.querySelector('#trabalho').style.getPropertyValue('--chapter-entry')) > .25);
      const entering = await current.locator('#trabalho').evaluate(node => ({
        progress: node.style.getPropertyValue('--chapter-entry'),
        title: getComputedStyle(node.querySelector('.chapter-title-line > span')).transform,
        skew: new DOMMatrix(getComputedStyle(node.querySelector('.chapter-title-line > span')).transform).c,
        seam: getComputedStyle(node.querySelector('.chapter-seam')).transform,
        drift: getComputedStyle(node.querySelector('.chapter-copy-drift')).transform,
      }));
      assert(Math.abs(entering.skew) > .001, 'title has no skew while entering');
      await scrollTo(current, '#trabalho', 100);
      await current.waitForFunction(() => Number(document.querySelector('#trabalho').style.getPropertyValue('--chapter-entry')) === 1);
      const settled = await current.locator('#trabalho .chapter-title-line > span').first().evaluate(node => {
        const matrix = new DOMMatrix(getComputedStyle(node).transform);
        return { x: matrix.e, y: matrix.f, skew: matrix.c };
      });
      assert(Object.values(settled).every(value => Math.abs(value) < .001), 'title never settled');
      return { entering, settled };
    });

    await run('header-label-roll-keeps-one-accessible-name', async current => {
      const link = current.locator('.header-nav a').first();
      assert(await current.getByRole('link', { name: 'A gente', exact: true }).count() === 1, 'decorative duplicate changed the accessible name');
      const before = await link.boundingBox();
      await link.hover();
      await current.waitForFunction(() => new DOMMatrix(getComputedStyle(document.querySelector('.header-label-roll')).transform).f < -10);
      assert(JSON.stringify(await link.boundingBox()) === JSON.stringify(before), 'header link hit area moved');
      await link.focus();
      assert(await transform(current, '.header-label-roll') === 'none', 'keyboard focus left the header label moving');
      return { accessibleName: 'A gente', hitAreaStable: true, keyboardImmediate: true };
    });

    await run('primary-sweep-and-founder-feedback-keep-actions-still', async current => {
      await scrollTo(current, '#pacote', 100);
      const button = current.locator('.package-summary > .button');
      const before = await button.boundingBox();
      await button.hover();
      await current.waitForFunction(() => Math.abs(new DOMMatrix(getComputedStyle(document.querySelector('.package-summary > .button'), '::before').transform).e) < .01);
      assert(JSON.stringify(await button.boundingBox()) === JSON.stringify(before), 'primary button moved');
      await scrollTo(current, '.founders', 200);
      const founder = current.locator('.founder').first();
      const contact = founder.locator('.founder-contact');
      const contactBefore = await contact.boundingBox();
      await founder.hover();
      await current.waitForFunction(() => getComputedStyle(document.querySelector('.founder'), '::before').opacity === '1');
      assert(JSON.stringify(await contact.boundingBox()) === JSON.stringify(contactBefore), 'founder feedback moved the contact');
      await contact.focus();
      assert(await contact.evaluate(node => node.matches(':focus-visible') && getComputedStyle(node).outlineStyle === 'solid'), 'contact focus not visible');
      return { buttonStable: true, contactStable: true, visibleFocus: true };
    });

    await run('footer-letters-follow-mouse-without-cropping-the-last-glyph', async current => {
      await scrollTo(current, '.footer-word', 500);
      await current.waitForFunction(() => document.querySelector('.footer-word').style.getPropertyValue('--word-progress') === '1');
      const word = current.locator('.footer-word');
      const letter = current.locator('.footer-letter').nth(3);
      const bounds = await letter.boundingBox();
      await current.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
      await current.waitForFunction(() => [...document.querySelectorAll('.footer-letter')].some(node => Number(node.style.getPropertyValue('--letter-lift')) > 10));
      const state = await word.evaluate(node => ({
        lifts: [...node.querySelectorAll('.footer-letter')].map(letter => Number(letter.style.getPropertyValue('--letter-lift'))),
        right: node.querySelector('.footer-letter:last-child').getBoundingClientRect().right,
        maskRight: node.querySelector('.footer-letters').getBoundingClientRect().right,
        width: document.documentElement.clientWidth,
      }));
      assert(state.right < state.maskRight - 2 && state.maskRight <= state.width, `last glyph lost its ink margin: ${JSON.stringify(state)}`);
      await current.mouse.move(1, 90);
      await current.waitForFunction(() => [...document.querySelectorAll('.footer-letter')].every(node => Number(node.style.getPropertyValue('--letter-lift')) === 0));
      return state;
    });

    for (const height of [560, 667, 844]) await run(`mobile-readable-stops-and-counter-${height}`, async current => {
      await current.waitForFunction(() => document.querySelector('.people-hero').dataset.motionMode === 'mobile-story');
      const stops = [.0575, .3525, .6475, .9425];
      const names = [];
      for (const index of [0, 1, 2, 3, 2, 1, 0]) {
        await current.locator('.people-story').evaluate((node, progress) => {
          const header = document.querySelector('.site-header').getBoundingClientRect().height;
          scrollTo({ top: node.getBoundingClientRect().top + scrollY - header + (node.offsetHeight - innerHeight + header) * progress, behavior: 'instant' });
        }, stops[index]);
        await current.waitForFunction(index => {
          const card = document.querySelectorAll('.person-card')[index];
          return card.dataset.active === 'true' && Number(getComputedStyle(card.querySelector('.person-copy')).opacity) > .99
            && Number(getComputedStyle(card.querySelector('.person-portrait')).opacity) > .99;
        }, index);
        const reading = await current.locator('.person-card').nth(index).evaluate(node => {
          const photo = node.querySelector('.person-portrait img').getBoundingClientRect();
          const name = node.querySelector('.person-name').getBoundingClientRect();
          const bottom = document.querySelector('.hero-bottom').getBoundingClientRect();
          return { name: node.querySelector('.person-name').getAttribute('aria-label'), photoBottom: photo.bottom, nameTop: name.top, nameBottom: name.bottom, actionsTop: bottom.top, counter: document.querySelector('.portrait-counter-roll').style.transform };
        });
        assert(reading.photoBottom <= reading.nameTop + 2 && reading.nameBottom < reading.actionsTop, `mobile reading overlaps at ${height}: ${JSON.stringify(reading)}`);
        assert(parseFloat(reading.counter.slice(11)) === -index * 100, 'mobile counter out of sync');
        names.push(reading.name);
      }
      assert(await noOverflow(current), 'mobile stage overflows');
      const duration = await current.locator('.people-story').evaluate(node => node.offsetHeight / innerHeight);
      assert(Math.abs(duration - 3) < .01, 'mobile story duration changed');
      return { height, names, storyScreens: duration };
    }, { ...mobile, viewport: { width: 390, height } });

    await run('landscape-stays-in-flow-without-tilt-or-three', async current => {
      await current.waitForFunction(() => document.querySelector('.people-hero').dataset.motionMode === 'mobile-flow');
      await scrollTo(current, '.scroll-frame', 100);
      await current.locator('.scroll-frame').first().dispatchEvent('pointermove', { pointerType: 'touch', clientX: 600, clientY: 200 });
      assert(await transform(current, '.scroll-frame-tilt') === 'none' && await current.locator('canvas').count() === 0, 'landscape mounted mouse-only effects');
      assert(await noOverflow(current), 'landscape overflow');
      return { mode: 'mobile-flow', tilt: false, canvas: false };
    }, { ...mobile, viewport: { width: 844, height: 390 } });

    await run('live-reduced-motion-removes-new-spatial-effects', async current => {
      await scrollTo(current, '.scroll-frame', 100);
      await current.emulateMedia({ reducedMotion: 'reduce' });
      await current.waitForFunction(() => document.querySelector('.people-hero').dataset.mode === 'static');
      const state = await current.evaluate(() => ({
        effects: [...document.querySelectorAll('.opening-backdrop, .scroll-frame-tilt, .scroll-frame-surface, .hero-project-arrow')].map(node => getComputedStyle(node).transform),
        chapters: document.querySelectorAll('.chapter-title-line, .chapter-copy-drift, .footer-letter-ink').length,
        canvas: document.querySelectorAll('canvas').length,
        people: document.querySelectorAll('.person-card').length,
        running: document.getAnimations().filter(animation => animation.playState === 'running').length,
      }));
      assert(state.effects.every(value => value === 'none') && state.chapters === 0 && state.canvas === 0 && state.running === 0 && state.people === 4, JSON.stringify(state));
      return state;
    });

    for (const width of [390, 1440]) await run(`text-enlargement-stabilizes-new-effects-${width}`, async current => {
      await current.addStyleTag({ content: '.person-kicker { font-size: 30px !important; }' });
      await current.waitForFunction(() => document.documentElement.hasAttribute('data-large-text'));
      await current.waitForFunction(() => document.querySelector('.people-hero').dataset.motionMode !== 'desktop' && document.querySelector('.people-hero').dataset.motionMode !== 'mobile-story');
      const state = await current.evaluate(() => ({
        mode: document.querySelector('.people-hero').dataset.motionMode,
        canvas: document.querySelectorAll('canvas').length,
        backdrop: getComputedStyle(document.querySelector('.opening-backdrop')).transform,
        tilt: getComputedStyle(document.querySelector('.scroll-frame-tilt')).transform,
      }));
      assert(state.canvas === 0 && state.backdrop === 'none' && state.tilt === 'none' && await noOverflow(current), JSON.stringify(state));
      return state;
    }, { viewport: { width, height: 844 } });

    await run('no-js-retains-complete-html-and-native-menu', async current => {
      assert(await current.locator('.person-card').count() === 4, 'no-JS lost a person');
      assert(await transform(current, '.opening-backdrop') === 'none' && await transform(current, '.scroll-frame-tilt') === 'none', 'SSR has an initial transform');
      await current.locator('.nav-menu summary').click();
      assert(await current.locator('.nav-menu').evaluate(node => node.open), 'native menu failed');
      assert(await current.locator('.project-noscript').count() === 1 && await noOverflow(current), 'no-JS catalogue/flow incomplete');
      return { people: 4, nativeMenu: true, staticBackdrop: true, catalogue: true };
    }, { ...mobile, javaScriptEnabled: false });

    await run('hidden-tab-resets-without-replaying-the-opening', async current => {
      await current.locator('.opening-dot').first().click();
      await scrollTo(current, '.footer-word', 500);
      await current.waitForFunction(() => document.querySelector('.footer-word').style.getPropertyValue('--word-progress') === '1');
      await current.locator('.footer-letter').nth(2).hover();
      await current.waitForFunction(() => [...document.querySelectorAll('.footer-letter')].some(node => Number(node.style.getPropertyValue('--letter-lift')) > 10));
      await current.evaluate(() => {
        Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
        document.dispatchEvent(new Event('visibilitychange'));
      });
      await current.waitForFunction(() => document.getAnimations().filter(animation => animation.playState === 'running').length === 0);
      const hidden = await current.evaluate(() => ({
        paused: document.documentElement.hasAttribute('data-motion-paused'),
        engine: document.documentElement.dataset.scrollEngine,
        lift: [...document.querySelectorAll('.footer-letter')].map(node => Number(node.style.getPropertyValue('--letter-lift'))),
      }));
      assert(hidden.paused && hidden.engine === 'native' && hidden.lift.every(value => value === 0), JSON.stringify(hidden));
      await current.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
      await current.waitForFunction(() => !document.documentElement.hasAttribute('data-motion-paused'));
      assert(await current.locator('.opening').evaluate(node => node.dataset.interacted === 'true' && !node.getAnimations({ subtree: true }).some(animation => animation.playState === 'running')), 'opening replayed after visibility returned');
      return { hidden, openingDidNotReplay: true, visibilitySimulated: true };
    });

    return { passed: results.length, results };
  } catch (error) {
    throw new Error(JSON.stringify({ completed: results, error: error.message }));
  }
}
