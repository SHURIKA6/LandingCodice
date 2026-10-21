async (page) => {
  // Trusted local async(page) scenario. Run through setup/isolated-playwright.mjs
  // to use a fresh browser profile and record every context; no external links
  // are followed, and the application/server are not changed by this suite.
  const base = new URL(page.url()).origin;
  const browser = page.context().browser();
  const engine = browser.browserType().name();
  const names = ['Fernando Riad', 'Eduardo Gobatto', 'Victor Rafael'];
  const evidenceDir = `docs/mobile-motion-2026-10-21/setup/browser-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  const results = [];
  const assert = (condition, message, data) => {
    if (!condition) throw new Error(`${message}${data === undefined ? '' : `: ${JSON.stringify(data)}`}`);
  };
  const hydrated = p => p.waitForFunction(() => Boolean(document.documentElement.dataset.scrollEngine));
  const expectMode = (p, expected) => p.waitForFunction(expected => document.querySelector('.people-hero')?.dataset.motionMode === expected, expected, { timeout: 7000 });
  const loaded = p => p.waitForFunction(() => [...document.querySelectorAll('.person-portrait img')].every(image => image.complete && image.naturalWidth > 0));
  const settle = p => p.waitForTimeout(140);
  const active = p => p.locator('.person-card[data-active="true"] .person-name').getAttribute('aria-label');
  const at = async (p, progress) => {
    await p.locator('.people-story').evaluate((node, value) => {
      const header = document.querySelector('.site-header').getBoundingClientRect().height;
      const start = node.getBoundingClientRect().top + scrollY - header;
      scrollTo({ top: start + (node.offsetHeight - (innerHeight - header)) * value, behavior: 'instant' });
    }, progress);
    await settle(p);
  };
  const nearest = p => p.evaluate(() => {
    const cards = [...document.querySelectorAll('.person-card')].map(node => {
      const rect = node.getBoundingClientRect();
      return { name: node.querySelector('.person-name').getAttribute('aria-label'),
        visibleHeight: Math.max(0, Math.min(innerHeight, rect.bottom) - Math.max(document.querySelector('.site-header').getBoundingClientRect().bottom, rect.top)),
        distance: Math.abs((rect.top + rect.bottom) / 2 - innerHeight / 2) };
    });
    return cards.sort((a, b) => b.visibleHeight - a.visibleHeight || a.distance - b.distance)[0];
  });
  const allHTML = async p => {
    const state = await p.evaluate(() => ({
      names: [...document.querySelectorAll('.person-name')].map(node => node.getAttribute('aria-label')),
      portraits: [...document.querySelectorAll('.person-portrait img')].map(node => ({ src: node.getAttribute('src'), alt: node.alt })),
      price: document.querySelector('.package-price').textContent,
      contacts: [...document.querySelectorAll('a[href^="https://wa.me/"]')].map(node => new URL(node.href).pathname.slice(1)),
    }));
    assert(state.names.join('|') === names.join('|'), 'People missing, duplicated or reordered', state);
    assert(state.portraits.length === 3 && state.portraits.every(image => image.src && image.alt), 'Portrait HTML was lost', state);
    assert(state.price.includes('R$ 1.500'), 'Complete offer price missing', state);
    assert(state.contacts.length > 0 && state.contacts.every(number => ['5566999356646', '556684184488'].includes(number)), 'Commercial contacts changed', state);
    return state;
  };
  const rest = p => p.evaluate(() => {
    const rect = node => {
      const r = node.getBoundingClientRect();
      return { x: r.x, y: r.y, top: r.top, right: r.right, bottom: r.bottom, left: r.left, width: r.width, height: r.height };
    };
    const card = document.querySelector('.person-card[data-active="true"]');
    const photo = card.querySelector('.person-portrait');
    const image = photo.querySelector('img');
    const matrix = new DOMMatrixReadOnly(getComputedStyle(photo).transform);
    return {
      active: card.querySelector('.person-name').getAttribute('aria-label'),
      stage: rect(document.querySelector('.people-stage')), header: rect(document.querySelector('.site-header')),
      photo: rect(photo), image: rect(image), copy: rect(card.querySelector('.person-copy')),
      name: rect(card.querySelector('.person-name')), progress: rect(document.querySelector('.portrait-progress')),
      actions: [...document.querySelectorAll('.people-stage .hero-bottom a')].map(node => ({ text: node.textContent.trim(), rect: rect(node) })),
      opacity: Number(getComputedStyle(photo).opacity), copyOpacity: Number(getComputedStyle(card.querySelector('.person-copy')).opacity),
      photoTransform: getComputedStyle(photo).transform,
      scaleX: Math.hypot(matrix.a, matrix.b), scaleY: Math.hypot(matrix.c, matrix.d), rotation: Math.atan2(matrix.b, matrix.a) * 180 / Math.PI,
      objectFit: getComputedStyle(image).objectFit,
      width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth,
    };
  });
  const checkRest = state => {
    assert(state.scrollWidth <= state.width + 1, 'Horizontal overflow at portrait rest', state);
    assert(Math.abs(state.stage.top - state.header.bottom) < 2, 'Sticky stage is not below the header', state);
    assert(state.opacity > .99 && state.copyOpacity > .99, 'Photo or full name is not readable at rest', state);
    assert(Math.abs(state.scaleX - 1) < .005 && Math.abs(state.scaleY - 1) < .005 && Math.abs(state.rotation) < .05, 'Portrait is distorted or rotated at rest', state);
    assert(state.objectFit === 'contain', 'Original photograph must retain its proportion', state);
    assert(state.photo.top >= state.header.bottom - 1 && state.photo.bottom <= state.copy.top + 1, 'Photo overlaps the active copy or header', state);
    assert(state.name.top >= state.copy.top - 1 && state.name.bottom <= state.copy.bottom + 1, 'Full name escapes its reading area', state);
    assert(state.copy.bottom <= state.progress.top + 1, 'Active copy overlaps the indicator', state);
    assert(state.actions.every(action => action.rect.top >= state.progress.bottom - 1 && action.rect.bottom <= state.height + 1 && action.rect.left >= -1 && action.rect.right <= state.width + 1), 'Stage control overlaps copy/indicator or escapes the viewport', state);
  };
  const noThree = async (p, network) => {
    await Promise.allSettled(network.pending);
    assert(await p.locator('canvas').count() === 0, 'A mobile context contains a canvas');
    assert(network.three.length === 0, 'A mobile context downloaded the optional Three renderer', network.three);
  };
  const staticState = p => p.evaluate(() => {
    const selectors = '.person-portrait,.person-copy,.scroll-frame-surface,[data-reveal],.process li h4,.process li p,.process-number,.menu-label,.chapter-surface,.footer-letter';
    return { animations: document.getAnimations().filter(animation => animation.playState === 'running' || animation.pending).length,
      transformed: [...document.querySelectorAll(selectors)].filter(node => getComputedStyle(node).transform !== 'none').map(node => ({ className: node.className, transform: getComputedStyle(node).transform })),
      canvas: document.querySelectorAll('canvas').length };
  });
  const run = async (scenario, test, options = {}, setup) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'no-preference', ...options });
    const p = await context.newPage();
    p.setDefaultTimeout(8000);
    const errors = [];
    const network = { scripts: [], three: [], loaders: [], pending: [] };
    p.on('pageerror', error => errors.push(error.message));
    p.on('response', response => {
      if (response.request().resourceType() !== 'script') return;
      network.scripts.push(response.url());
      const inspection = response.text().then(source => {
        // Turbopack eagerly sends a small async-loader table for dynamic imports.
        // It names the future Three chunks without fetching/evaluating them.
        if (/PortraitScene/i.test(response.url()) && source.includes('async loader')) network.loaders.push(response.url());
        // WebGLRenderer remains an exported/property/error identifier in the
        // minified Three production chunk, whose URL no longer names Three.
        if (/node_modules_three_build_three_|three[._/-](?:module|core|webgpu)/i.test(response.url()) || /WebGLRenderer/.test(source)) network.three.push(response.url());
      }).catch(() => {});
      network.pending.push(inspection);
    });
    try {
      if (setup) await setup(context, p);
      await p.goto(base, { waitUntil: 'domcontentloaded' });
      await p.locator('#hero-title').waitFor();
      if (options.javaScriptEnabled !== false) await hydrated(p);
      const data = await test(p, context, network);
      assert(errors.length === 0, 'Page runtime errors', errors);
      results.push({ scenario, pass: true, ...data });
    } catch (error) {
      const observed = await p.evaluate(() => ({ url: location.href, scrollY, viewport: { width: innerWidth, height: innerHeight }, heroMode: document.querySelector('.people-hero')?.dataset.motionMode,
        active: document.querySelector('.person-card[data-active="true"] .person-name')?.getAttribute('aria-label'), scrollWidth: document.documentElement.scrollWidth })).catch(() => null);
      const capture = `${evidenceDir}/${scenario}-failure.png`;
      await p.screenshot({ path: capture }).catch(() => {});
      results.push({ scenario, pass: false, error: error.message, observed, pageErrors: errors, capture });
    } finally { await context.close(); }
  };

  for (const viewport of [{ width: 320, height: 568 }, { width: 360, height: 740 }, { width: 390, height: 844 }, { width: 430, height: 932 }, { width: 768, height: 1024 }, { width: 844, height: 390 }]) {
    await run(`matrix-${viewport.width}x${viewport.height}`, async (p, _, network) => {
      await loaded(p);
      const mode = viewport.width < viewport.height && viewport.height >= 560 ? 'mobile-story' : 'mobile-flow';
      await expectMode(p, mode);
      await allHTML(p);
      const states = [];
      if (mode === 'mobile-story') {
        assert(await p.locator('.people-stage').evaluate(node => getComputedStyle(node).position) === 'sticky', 'Portrait stage is not sticky');
        for (const [index, progress] of [.08, .5, .92].entries()) {
          await at(p, progress);
          // Scroll sampling, Motion's paint and React's active marker can land
          // on different frames in a busy browser. Wait for the complete reading
          // pose, then keep all of the existing geometry assertions below.
          await p.waitForFunction(expected => {
            const card = document.querySelector('.person-card[data-active="true"]');
            return card?.querySelector('.person-name')?.getAttribute('aria-label') === expected
              && Number(getComputedStyle(card.querySelector('.person-portrait')).opacity) > .99
              && Number(getComputedStyle(card.querySelector('.person-copy')).opacity) > .99;
          }, names[index]);
          const state = await rest(p);
          state.capture = `${evidenceDir}/matrix-${viewport.width}x${viewport.height}-rest-${index}.png`;
          await p.screenshot({ path: state.capture });
          assert(state.active === names[index], 'Wrong person at reading rest', state);
          checkRest(state);
          states.push(state);
        }
        for (const state of states.slice(1)) state.actions.forEach((action, index) => assert(Math.abs(action.rect.top - states[0].actions[index].rect.top) < 1 && Math.abs(action.rect.left - states[0].actions[index].rect.left) < 1, 'Portrait choreography moved a control', { first: states[0].actions[index], later: action }));
      } else {
        assert(await p.locator('.people-stage').evaluate(node => getComputedStyle(node).position) !== 'sticky', 'Low landscape viewport kept a sticky story');
        for (let index = 0; index < 3; index++) {
          await p.locator('.person-card').nth(index).scrollIntoViewIfNeeded();
          await settle(p);
          assert(await p.locator('.person-name').nth(index).isVisible(), 'Flow layout hid a person');
          const bounds = await p.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
          assert(bounds.scrollWidth <= bounds.width + 1, 'Flow layout has horizontal overflow', bounds);
        }
      }
      await noThree(p, network);
      return { mode, rests: states, optionalRendererRequests: network.three, developmentLoaderTables: network.loaders };
    }, { viewport });
  }

  await run('hero-skip-focused-during-opening-has-stable-visible-ancestors', async p => {
    await p.locator('.hero-skip').focus();
    const state = await p.locator('.hero-skip').evaluate(node => {
      const ancestors = [];
      let current = node;
      while (current && !current.matches('.people-hero')) {
        const style = getComputedStyle(current);
        ancestors.push({ className: current.className, opacity: style.opacity, transform: style.transform,
          animations: current.getAnimations().filter(animation => animation.playState === 'running' || animation.pending).length });
        current = current.parentElement;
      }
      const rect = node.getBoundingClientRect();
      const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return { focused: node === document.activeElement, hit: node === hit || node.contains(hit), href: node.getAttribute('href'), ancestors,
        openingCopyAnimations: document.querySelector('.hero-description p').getAnimations().filter(animation => animation.playState === 'running' || animation.pending).length };
    });
    assert(state.focused && state.hit && state.ancestors.every(node => node.opacity === '1' && node.transform === 'none' && node.animations === 0), 'Opening moves or obscures the focused project shortcut', state);
    assert(state.href === '#trabalho', 'Project shortcut href changed', state);
    const capture = `${evidenceDir}/hero-skip-focused-opening.png`;
    await p.screenshot({ path: capture });
    return { state, capture };
  });

  await run('mobile-cinematic-stage-fast-scroll-reversal-and-reload', async p => {
    await loaded(p); await expectMode(p, 'mobile-story');
    const poses = [];
    for (const progress of [.08, .30, .5, .74, .92, .5, .08]) {
      await at(p, progress);
      poses.push(await p.evaluate(() => ({ active: document.querySelector('.person-card[data-active=true] .person-name').getAttribute('aria-label'), photo: getComputedStyle(document.querySelector('.person-card .person-portrait')).transform })));
    }
    assert(poses.map(pose => pose.active).join('|') === 'Fernando Riad|Eduardo Gobatto|Eduardo Gobatto|Victor Rafael|Victor Rafael|Eduardo Gobatto|Fernando Riad', 'Mobile sequence is wrong', poses);
    assert(poses[0].photo !== poses[2].photo && poses[0].photo === poses[6].photo, 'Reversal did not restore the same portrait pose', poses);
    const intermediateFrames = [];
    for (const progress of [.23, .28, .33, .67, .72, .77]) {
      await at(p, progress);
      const visible = await p.locator('.person-card').evaluateAll(cards => cards.map(card => ({
        photoOpacity: Number(getComputedStyle(card.querySelector('.person-portrait')).opacity),
        copyOpacity: Number(getComputedStyle(card.querySelector('.person-copy')).opacity),
        photoTransform: getComputedStyle(card.querySelector('.person-portrait')).transform,
      })));
      assert(visible.some(card => card.photoOpacity >= .49) && visible.some(card => card.copyOpacity >= .49), 'Portrait handoff contains a blank frame', { progress, visible });
      const capture = `${evidenceDir}/portrait-handoff-${progress}.png`;
      await p.screenshot({ path: capture });
      intermediateFrames.push({ progress, visible, capture });
    }
    for (const progress of [.92, .08, .92, .5]) await at(p, progress);
    assert(await active(p) === names[1], 'Fast scroll did not settle on Eduardo');
    const beforeReload = await p.evaluate(() => scrollY);
    await p.reload({ waitUntil: 'domcontentloaded' });
    await hydrated(p); await loaded(p); await expectMode(p, 'mobile-story');
    // Bundled WebKit on Windows resets native reload to 0 even with JavaScript
    // disabled (verified separately). Do not make the app implement persistence
    // in place of that engine feature. Chromium exercises native restoration;
    // WebKit still verifies full HTML after reload and deterministic re-entry.
    if (engine !== 'webkit') await p.waitForFunction(() => document.querySelector('.person-card[data-active=true] .person-name').getAttribute('aria-label') === 'Eduardo Gobatto', null, { timeout: 5000 });
    const afterReload = await p.evaluate(() => scrollY);
    await allHTML(p);
    if (engine === 'webkit') await at(p, .5);
    const state = await rest(p); checkRest(state);
    assert(state.active === names[1], 'Reload/re-entry cannot display Eduardo', state);
    return { poses, intermediateFrames, beforeReload, afterReload, reloaded: state.active,
      nativeReloadRestorationExercised: engine !== 'webkit', limitation: engine === 'webkit' ? 'Bundled WebKit resets scroll on native reload, including with JS disabled; full HTML and deterministic same-session re-entry tested.' : null };
  });

  await run('responsive-breakpoints-767-768-and-1023-1024-both-directions', async (p, _, network) => {
    await loaded(p); await expectMode(p, 'mobile-story'); await at(p, .5);
    const changes = [];
    for (const width of [767, 768, 767, 768, 1023, 1024, 1023, 1024, 1023]) {
      await p.setViewportSize({ width, height: 1200 });
      await expectMode(p, width >= 1024 ? 'desktop' : 'mobile-story');
      await p.waitForTimeout(width >= 1024 ? 700 : 250);
      const state = await p.evaluate(() => ({ width: innerWidth, scrollY, scrollWidth: document.documentElement.scrollWidth,
        mode: document.querySelector('.people-hero').dataset.motionMode, active: document.querySelector('.person-card[data-active=true] .person-name').getAttribute('aria-label'), names: document.querySelectorAll('.person-name').length }));
      assert(state.active === names[1] && state.names === 3, 'Breakpoint lost Eduardo or duplicated headings', state);
      assert(state.scrollWidth <= state.width + 1, 'Breakpoint created overflow', state);
      changes.push(state);
    }
    await Promise.allSettled(network.pending);
    assert(network.three.length > 0, 'Three detector positive control failed after desktop became eligible', network.scripts);
    return { changes, optionalRendererPositiveControl: network.three };
  });

  await run('orientation-and-short-height-preserve-nearest-person', async p => {
    await loaded(p); await expectMode(p, 'mobile-story'); await at(p, .5);
    const changes = [];
    for (const viewport of [{ width: 844, height: 390 }, { width: 390, height: 844 }, { width: 390, height: 559 }, { width: 390, height: 560 }, { width: 390, height: 844 }]) {
      await p.setViewportSize(viewport);
      const expected = viewport.width < viewport.height && viewport.height >= 560 ? 'mobile-story' : 'mobile-flow';
      await expectMode(p, expected); await p.waitForTimeout(250);
      const person = expected === 'mobile-story' ? { name: await active(p) } : await nearest(p);
      assert(person.name === names[1], 'Orientation/height change lost the nearest person', { viewport, expected, person });
      changes.push({ viewport, mode: expected, person });
    }
    return { changes };
  });

  await run('live-reduced-motion-preserves-person-and-focus', async p => {
    await loaded(p); await expectMode(p, 'mobile-story'); await at(p, .5);
    await p.locator('.header-cta').evaluate(node => node.focus({ preventScroll: true }));
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await expectMode(p, 'static'); await settle(p);
    const person = await nearest(p);
    const state = await staticState(p);
    assert(person.name === names[1], 'Reduced motion lost the nearest person', { person, state });
    assert(await p.locator('.header-cta').evaluate(node => node === document.activeElement), 'Reduced motion lost keyboard focus');
    assert(state.animations === 0 && state.transformed.length === 0 && state.canvas === 0, 'Reduced motion did not cancel every active effect', state);
    await allHTML(p);
    return { person, state, focusPreserved: true };
  });

  await run('initial-reduced-motion-full-static-html', async (p, _, network) => {
    await expectMode(p, 'static');
    const html = await allHTML(p);
    const state = await staticState(p);
    assert(state.animations === 0 && state.transformed.length === 0, 'Initial reduced preference retained motion', state);
    await noThree(p, network);
    return { html, state };
  }, { reducedMotion: 'reduce' });

  let releasePortrait;
  await run('slow-portrait-keeps-readable-flow-until-all-three-decode', async (p, _, network) => {
    await p.waitForFunction(() => [...document.querySelectorAll('.person-portrait img')].slice(0, 2).every(image => image.complete && image.naturalWidth > 0));
    await expectMode(p, 'mobile-flow');
    const pending = await p.evaluate(() => ({ decoded: window.__portraitDecoded ?? [], stage: getComputedStyle(document.querySelector('.people-stage')).position,
      images: [...document.querySelectorAll('.person-portrait img')].map(image => ({ src: image.getAttribute('src'), naturalWidth: image.naturalWidth })) }));
    assert(pending.images[2].naturalWidth === 0 && pending.stage !== 'sticky', 'Pending photograph entered a cinematic stage', pending);
    await allHTML(p);
    releasePortrait();
    await loaded(p); await expectMode(p, 'mobile-story');
    const decoded = await p.evaluate(() => window.__portraitDecoded ?? []);
    assert(['fernando.jpg', 'eduardo.jpg', 'victor.png'].every(file => decoded.some(url => url.endsWith(file))), 'Story enabled before all portrait decode promises resolved', decoded);
    await noThree(p, network);
    return { pending, decoded };
  }, {}, async context => {
    await context.addInitScript(() => {
      window.__portraitDecoded = [];
      const decode = HTMLImageElement.prototype.decode;
      HTMLImageElement.prototype.decode = function (...args) {
        return decode.apply(this, args).then(value => { if (this.src.includes('/team/')) window.__portraitDecoded.push(this.src); return value; });
      };
    });
    await context.route('**/team/victor.png', async route => {
      await new Promise(resolve => { releasePortrait = resolve; });
      await route.continue();
    });
  });

  await run('failed-portrait-keeps-three-people-in-readable-flow', async (p, _, network) => {
    await p.waitForFunction(() => [...document.querySelectorAll('.person-portrait img')].every(image => image.complete));
    await expectMode(p, 'mobile-flow');
    const html = await allHTML(p);
    const cards = await p.locator('.person-card').evaluateAll(nodes => nodes.map(node => {
      const rect = node.getBoundingClientRect();
      const copy = node.querySelector('.person-copy');
      const image = node.querySelector('img');
      return { top: rect.top, bottom: rect.bottom, height: rect.height, copyOpacity: getComputedStyle(copy).opacity, naturalWidth: image.naturalWidth, alt: image.alt };
    }));
    assert(cards.every(card => card.height > 0 && Number(card.copyOpacity) > .99), 'Failed photo left a blank/hidden person', cards);
    assert(cards[0].naturalWidth > 0 && cards[1].naturalWidth > 0 && cards[2].naturalWidth === 0, 'Image-failure precondition was not exercised', cards);
    assert(cards.slice(1).every((card, index) => card.top >= cards[index].bottom - 1), 'Image failure left stacked cinematic cards', cards);
    await noThree(p, network);
    return { html, cards };
  }, {}, context => context.route('**/team/victor.png', route => route.abort()));

  await run('no-javascript-has-three-portraits-names-price-and-native-anchor', async p => {
    const html = await allHTML(p);
    assert(await p.locator('.people-hero').getAttribute('data-motion-mode') === 'static', 'Server HTML is not static');
    for (let index = 0; index < 3; index++) {
      const card = p.locator('.person-card').nth(index);
      await card.scrollIntoViewIfNeeded();
      await p.waitForTimeout(250);
      assert(await card.locator('.person-name').isVisible(), 'No-JS flow hid a name', names[index]);
      assert(await card.locator('img').evaluate(image => image.complete && image.naturalWidth > 0), 'No-JS flow lost a portrait', names[index]);
    }
    await p.getByRole('link', { name: 'Ver projetos', exact: true }).click();
    // Native CSS smooth scrolling also runs without JS; inspect until arrival,
    // rather than mistaking an intermediate native frame for a broken anchor.
    let anchorTop;
    for (let attempt = 0; attempt < 25; attempt++) {
      anchorTop = await p.locator('#trabalho').evaluate(node => node.getBoundingClientRect().top);
      if (anchorTop >= 0 && anchorTop < 160) break;
      await p.waitForTimeout(50);
    }
    assert(anchorTop >= 0 && anchorTop < 160, 'Native no-JS anchor misses the projects', anchorTop);
    assert(await p.locator('canvas').count() === 0, 'No-JS page contains a canvas');
    return { html, anchorTop };
  }, { javaScriptEnabled: false });

  await run('process-track-progresses-and-reverses-with-scroll', async p => {
    await expectMode(p, 'mobile-story');
    const states = [];
    for (const progress of [.1, .5, .9, .5, .1]) {
      await p.locator('.process ol').evaluate((node, progress) => {
        const bounds = node.getBoundingClientRect();
        scrollTo({ top: bounds.top + scrollY + bounds.height * progress - innerHeight * .72, behavior: 'instant' });
      }, progress);
      await settle(p);
      const state = await p.locator('.process ol').evaluate(node => ({
        progress: Number(getComputedStyle(node).getPropertyValue('--process-progress')),
        track: getComputedStyle(node, '::after').transform,
        steps: [...node.querySelectorAll('li')].map(step => ({ progress: Number(getComputedStyle(step).getPropertyValue('--step-progress')), transform: getComputedStyle(step.querySelector('h4')).transform, text: step.textContent.trim() })),
      }));
      assert(Math.abs(state.progress - progress) < .025, 'Process track does not follow scroll', { requested: progress, state });
      assert(state.steps.length === 4 && state.steps.every(step => step.text), 'Process lost one of its four steps', state);
      states.push(state);
    }
    assert(states[0].track !== states[2].track, 'Process track never changes transform', states);
    assert(Math.abs(states[0].progress - states[4].progress) < .01 && Math.abs(states[1].progress - states[3].progress) < .01, 'Process progress does not reverse deterministically', states);
    return { states };
  });

  await run('focus-cancels-menu-and-contact-arrival-immediately', async p => {
    await expectMode(p, 'mobile-story');
    const menu = p.locator('.nav-menu summary');
    await menu.focus(); await p.keyboard.press('Enter'); await p.keyboard.press('Tab');
    const nativeTabTarget = await p.evaluate(() => document.activeElement?.textContent.trim());
    // This bundled mobile WebKit skips native anchors on Tab (also Alt+Tab).
    // Verify the app's focus handling directly; retain real Tab traversal in
    // Chromium and report this engine capability separately from app behavior.
    if (engine === 'webkit') await p.getByRole('link', { name: 'A gente', exact: true }).focus();
    const menuState = await p.locator('.nav-menu').evaluate(node => ({
      open: node.open, focused: document.activeElement?.textContent.trim(),
      animations: node.getAnimations({ subtree: true }).filter(animation => (animation.playState === 'running' || animation.pending) && animation.effect?.target?.matches('.menu-label,.menu-panel-surface')).length,
      labels: [...node.querySelectorAll('.menu-label')].map(label => ({ opacity: getComputedStyle(label).opacity, transform: getComputedStyle(label).transform })),
    }));
    assert(menuState.open && menuState.focused.startsWith('A gente'), 'Menu link is not immediately reachable by keyboard', menuState);
    assert(menuState.animations === 0 && menuState.labels.every(label => label.opacity === '1' && label.transform === 'none'), 'Focus waits for the menu choreography', menuState);
    await p.keyboard.press('Escape');
    assert(await menu.evaluate(node => node === document.activeElement), 'Escape did not return focus');
    await p.locator('.founder a').first().evaluate(node => {
      scrollTo({ top: node.getBoundingClientRect().top + scrollY - innerHeight * .7, behavior: 'instant' });
      node.focus({ preventScroll: true });
    });
    const contact = await p.locator('.founder a').first().evaluate(node => {
      const rect = node.getBoundingClientRect();
      const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return { focused: node === document.activeElement, hit: node === hit || node.contains(hit), href: node.getAttribute('href'),
        ancestors: [...(function* () { let current = node; while (current && current.id !== 'contato') { yield current; current = current.parentElement; } })()].map(element => ({ opacity: getComputedStyle(element).opacity, transform: getComputedStyle(element).transform })),
        animations: document.querySelector('#contato').getAnimations({ subtree: true }).filter(animation => animation.playState === 'running' || animation.pending).length };
    });
    assert(contact.focused && contact.hit && contact.ancestors.every(node => node.opacity === '1' && node.transform === 'none') && contact.animations === 0, 'Contact focus is obscured or moving during arrival', contact);
    assert(contact.href.includes('5566999356646'), 'Focused contact changed');
    return { menuState, contact, nativeTabTarget, nativeLinkTabTraversalExercised: engine !== 'webkit', limitation: engine === 'webkit' ? 'Bundled mobile WebKit skips anchors on Tab; direct link focus and Escape tested.' : null };
  });

  await run('live-reduced-motion-cancels-in-progress-chapter-and-menu', async p => {
    await expectMode(p, 'mobile-story');
    await p.locator('.package-price').evaluate(node => scrollTo({ top: node.getBoundingClientRect().top + scrollY - innerHeight * .8, behavior: 'instant' }));
    await p.waitForTimeout(50);
    const before = await p.locator('.package-price').evaluate(node => node.getAnimations().filter(animation => animation.playState === 'running' || animation.pending).length);
    assert(before > 0, 'Chapter animation precondition was not exercised');
    await p.locator('.nav-menu summary').evaluate(node => { node.parentElement.open = true; });
    await p.waitForTimeout(50);
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await expectMode(p, 'static'); await settle(p);
    const state = await staticState(p);
    assert(state.animations === 0 && state.transformed.length === 0, 'Reduced preference only masked an active animation', state);
    await allHTML(p);
    return { runningBeforePreference: before, state };
  });

  const failed = results.filter(result => !result.pass);
  const report = { passed: results.length - failed.length, failed: failed.length, evidenceDir, results };
  if (failed.length) throw new Error(JSON.stringify(report));
  return report;
}
