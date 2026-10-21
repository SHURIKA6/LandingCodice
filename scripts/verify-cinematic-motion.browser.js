async (page) => {
  const base = new URL(page.url()).origin;
  const browser = page.context().browser();
  const results = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const near = (a, b, tolerance = 1) => Math.abs(a - b) <= tolerance;
  const run = async (scenario, exercise, options = {}) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference', ...options });
    try {
      context.setDefaultTimeout(8000);
      const p = await context.newPage();
      const errors = [];
      p.on('pageerror', error => errors.push(error.message));
      await p.goto(base, { waitUntil: 'networkidle', timeout: 25000 });
      await p.waitForFunction(() => !!document.documentElement.dataset.scrollEngine);
      const evidence = await exercise(p, context);
      assert(errors.length === 0, `runtime errors: ${errors.join('; ')}`);
      results.push({ scenario, pass: true, ...evidence });
    } catch (error) {
      results.push({ scenario, pass: false, error: error.message });
    } finally {
      // The recording runner also tracks each context for bounded final cleanup.
      let timer;
      try { await Promise.race([context.close(), new Promise(resolve => { timer = setTimeout(resolve, 6000); })]); }
      finally { clearTimeout(timer); }
    }
  };
  const frames = p => p.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const scrollAt = async (p, selector, viewportTop) => {
    await p.locator(selector).first().evaluate((node, viewportTop) => {
      window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - viewportTop, behavior: 'instant' });
    }, viewportTop);
    await frames(p);
  };
  const matrix = (p, selector) => p.locator(selector).first().evaluate(node => {
    const m = new DOMMatrix(getComputedStyle(node).transform);
    return { x: m.e, y: m.f, scale: Math.hypot(m.a, m.b), angle: Math.atan2(m.b, m.a) * 180 / Math.PI };
  });
  const samePose = (a, b) => Object.keys(a).every(key => near(a[key], b[key], .5));
  const docBox = (p, selector) => p.locator(selector).first().evaluate(node => {
    const r = node.getBoundingClientRect();
    return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height };
  });

  await run('stylesheets-load-and-brand-is-rendered', async p => {
    const styles = await p.evaluate(async () => Promise.all([...document.querySelectorAll('link[rel="stylesheet"]')].map(async link => {
      const response = await fetch(link.href);
      return { href: new URL(link.href).pathname, status: response.status, type: response.headers.get('content-type') };
    })));
    const visual = await p.evaluate(() => ({ background: getComputedStyle(document.body).backgroundColor, font: getComputedStyle(document.body).fontFamily }));
    assert(styles.length > 0 && styles.every(style => style.status === 200 && style.type?.includes('text/css')), `stylesheet failure: ${JSON.stringify(styles)}`);
    assert(visual.background === 'rgb(247, 249, 252)' && !visual.font.includes('Times New Roman'), `unstyled page: ${JSON.stringify(visual)}`);
    return { styles, ...visual };
  });

  for (const profile of [
    { name: 'desktop', options: {} },
    { name: 'mobile', options: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ]) await run(`sculpture-arc-is-multiaxis-and-reversible-${profile.name}`, async p => {
    const selector = '.hero-sculpture-parallax';
    const clearOfCopy = () => p.evaluate(() => {
      const a = document.querySelector('.hero-sculpture-entry img').getBoundingClientRect();
      const b = document.querySelector('.hero-description-copy').getBoundingClientRect();
      return a.right <= b.left + 1 || a.left >= b.right - 1 || a.bottom <= b.top + 1 || a.top >= b.bottom - 1;
    });
    await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await p.waitForFunction(() => Math.abs(new DOMMatrix(getComputedStyle(document.querySelector('.hero-sculpture-parallax')).transform).f) < .5);
    await p.locator('.hero-sculpture-entry').evaluate(node => Promise.all(node.getAnimations().map(animation => animation.finished.catch(() => {}))));
    const initial = await matrix(p, selector);
    assert(await clearOfCopy(), 'sculpture intersects the introductory copy at rest');
    await p.evaluate(() => window.scrollTo({ top: 240, behavior: 'instant' }));
    await p.waitForFunction(() => {
      const m = new DOMMatrix(getComputedStyle(document.querySelector('.hero-sculpture-parallax')).transform);
      return m.e < -8 && Math.atan2(m.b, m.a) * 180 / Math.PI > 10;
    });
    const forward = await matrix(p, selector);
    assert(Math.abs(forward.x - initial.x) > 8 && Math.abs(forward.y - initial.y) > 4 && forward.scale - initial.scale > .03 && Math.abs(forward.angle - initial.angle) > 12, `arc did not change composition: ${JSON.stringify({ initial, forward })}`);
    assert(await clearOfCopy(), 'sculpture intersects the introductory copy at the arc peak');
    await p.evaluate(() => window.scrollTo({ top: 580, behavior: 'instant' }));
    await p.waitForFunction(() => new DOMMatrix(getComputedStyle(document.querySelector('.hero-sculpture-parallax')).transform).f < -25);
    const late = await matrix(p, selector);
    assert(await clearOfCopy(), 'sculpture intersects the introductory copy at the handoff');
    await p.evaluate(() => window.scrollTo({ top: 240, behavior: 'instant' }));
    await p.waitForFunction(() => {
      const m = new DOMMatrix(getComputedStyle(document.querySelector('.hero-sculpture-parallax')).transform);
      return m.e < -8 && Math.atan2(m.b, m.a) * 180 / Math.PI > 10;
    });
    const reversed = await matrix(p, selector);
    assert(samePose(forward, reversed), `return changed pose: ${JSON.stringify({ forward, reversed })}`);
    assert(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'sculpture caused horizontal overflow');
    return { initial, forward, late, reversed };
  }, profile.options);

  await run('roger-native-mask-is-preserved-during-reading', async p => {
    const center = await p.locator('.roger-case .scroll-frame').evaluate(node => ({ top: node.getBoundingClientRect().top + scrollY + node.offsetHeight / 2 - innerHeight / 2, range: (node.offsetHeight + innerHeight) / 2 }));
    await p.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), center.top);
    await p.waitForFunction(() => Math.abs(parseFloat(getComputedStyle(document.querySelector('.roger-case .scroll-frame-surface')).getPropertyValue('--project-pan-y')) + 4.5) < .1);
    await p.locator('.roger-media img').evaluate(image => image.decode());
    const linksBefore = await docBox(p, '.roger-copy .case-links');
    const before = await matrix(p, '.roger-media .project-media-pan');
    await p.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), center.top + center.range * .6);
    await p.waitForFunction(() => parseFloat(getComputedStyle(document.querySelector('.roger-case .scroll-frame-surface')).getPropertyValue('--project-pan-y')) < -7);
    const maskState = () => p.locator('.roger-media > .project-media-crop').evaluate(crop => {
      const mask = crop.getBoundingClientRect();
      const image = crop.querySelector('img').getBoundingClientRect();
      return {
        ratio: crop.clientWidth / crop.clientHeight,
        covered: image.top <= mask.top + 1 && image.bottom >= mask.bottom - 1 && image.left <= mask.left + 1 && image.right >= mask.right - 1,
      };
    });
    const state = await maskState();
    const after = await matrix(p, '.roger-media .project-media-pan');
    const linksAfter = await docBox(p, '.roger-copy .case-links');
    assert(near(state.ratio, 1.25, .01) && state.covered, `Roger mask changed proportion or exposed edges: ${JSON.stringify(state)}`);
    assert(after.y < before.y - 3 && Object.keys(linksBefore).every(key => near(linksBefore[key], linksAfter[key])), `Roger media/links geometry is wrong: ${JSON.stringify({ before, after, linksBefore, linksAfter })}`);
    await p.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), center.top + center.range * .99);
    await p.waitForFunction(() => parseFloat(getComputedStyle(document.querySelector('.roger-case .scroll-frame-surface')).getPropertyValue('--project-pan-y')) < -8.8);
    const endCoverage = await maskState();
    assert(endCoverage.covered, `Roger exposed blank edges at the end of its pan: ${JSON.stringify(endCoverage)}`);
    return { before, after, ...state, endCoverage, linksBefore, linksAfter };
  });

  for (const profile of [
    { name: 'desktop', options: {} },
    { name: 'mobile', options: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ]) await run(`chapter-fields-and-countermoving-type-follow-scroll-${profile.name}`, async p => {
    const viewport = await p.evaluate(() => innerHeight);
    const field = '#trabalho .chapter-surface';
    const title = '#trabalho .chapter-title-line > span';
    await p.waitForFunction(() => document.querySelector('#trabalho').dataset.choreography === 'true');
    await scrollAt(p, '#trabalho', viewport * .8);
    await p.waitForFunction(() => {
      const entry = parseFloat(getComputedStyle(document.querySelector('#trabalho')).getPropertyValue('--chapter-entry'));
      return entry > .15 && entry < .4;
    });
    const entry = { field: await matrix(p, field), title: await matrix(p, title) };
    assert(entry.field.x < -20 && entry.title.x > 10, `field and title did not counter-move: ${JSON.stringify(entry)}`);
    await scrollAt(p, '#trabalho', viewport * .15);
    await p.waitForFunction(() => parseFloat(getComputedStyle(document.querySelector('#trabalho')).getPropertyValue('--chapter-entry')) > .98);
    const settled = { field: await matrix(p, field), title: await matrix(p, title) };
    assert(Math.abs(settled.field.x) > Math.abs(entry.field.x) + 40 && Math.abs(settled.title.x) < 2 && Math.abs(settled.title.y) < 2, `chapter did not settle for reading: ${JSON.stringify({ entry, settled })}`);
    assert(await p.locator('#trabalho').evaluate(node => getComputedStyle(node).transform === 'none'), 'chapter motion transformed its scroll geometry');
    await scrollAt(p, '#trabalho', viewport * .8);
    await p.waitForFunction(() => {
      const entry = parseFloat(getComputedStyle(document.querySelector('#trabalho')).getPropertyValue('--chapter-entry'));
      return entry > .15 && entry < .4;
    });
    const reversed = { field: await matrix(p, field), title: await matrix(p, title) };
    assert(samePose(entry.field, reversed.field) && samePose(entry.title, reversed.title), `chapter return changed its pose: ${JSON.stringify({ entry, reversed })}`);
    return { entry, settled, reversed };
  }, profile.options);

  for (const profile of [
    { name: 'desktop', options: {} },
    { name: 'mobile', options: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ]) await run(`screenshots-pan-inside-mask-and-controls-stay-still-${profile.name}`, async p => {
    const frame = '.project-stage .scroll-frame';
    const controls = '.project-stage .project-controls';
    const center = await p.locator(frame).evaluate(node => ({ top: node.getBoundingClientRect().top + scrollY + node.offsetHeight / 2 - innerHeight / 2, range: (node.offsetHeight + innerHeight) / 2 }));
    await p.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), center.top);
    await p.waitForFunction(() => Math.hypot(...['a', 'b'].map(key => new DOMMatrix(getComputedStyle(document.querySelector('.project-stage .scroll-frame-surface')).transform)[key])) > .995);
    await p.locator('.project-capture-base').evaluate(image => image.decode());
    const before = await matrix(p, '.project-stage .project-media-pan');
    const controlsBefore = await docBox(p, controls);
    const coverage = () => p.locator('.project-screen').evaluate(mask => {
      const crop = mask.getBoundingClientRect();
      const pixels = mask.querySelector('.project-media-pan').getBoundingClientRect();
      return { top: pixels.top <= crop.top + 1, bottom: pixels.bottom >= crop.bottom - 1, left: pixels.left <= crop.left + 1, right: pixels.right >= crop.right - 1 };
    });
    assert(Object.values(await coverage()).every(Boolean), 'screen exposed blank edges at its settled pose');
    await p.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), center.top + center.range * .42);
    await p.waitForFunction(() => parseFloat(getComputedStyle(document.querySelector('.project-stage .scroll-frame-surface')).getPropertyValue('--project-pan-y')) < -6);
    const after = await matrix(p, '.project-stage .project-media-pan');
    const controlsAfter = await docBox(p, controls);
    assert(after.y < before.y - 3, `screenshot did not travel inside frame: ${JSON.stringify({ before, after })}`);
    assert(Object.values(await coverage()).every(Boolean), 'screen exposed blank edges during reading');
    assert(Object.keys(controlsBefore).every(key => near(controlsBefore[key], controlsAfter[key])), `control geometry moved with the media: ${JSON.stringify({ controlsBefore, controlsAfter })}`);
    await p.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), center.top + center.range * .99);
    await p.waitForFunction(() => parseFloat(getComputedStyle(document.querySelector('.project-stage .scroll-frame-surface')).getPropertyValue('--project-pan-y')) < -8.8);
    const end = await matrix(p, '.project-stage .project-media-pan');
    const endCoverage = await coverage();
    assert(Object.values(endCoverage).every(Boolean), `screen exposed blank edges at the end of its pan: ${JSON.stringify(endCoverage)}`);
    await p.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), center.top);
    await p.waitForFunction(() => Math.abs(parseFloat(getComputedStyle(document.querySelector('.project-stage .scroll-frame-surface')).getPropertyValue('--project-pan-y')) + 4.5) < .1);
    const reversed = await matrix(p, '.project-stage .project-media-pan');
    assert(samePose(before, reversed), `pan is not reversible: ${JSON.stringify({ before, reversed })}`);
    return { before, after, end, reversed, coverage: await coverage(), endCoverage, controlsBefore, controlsAfter };
  }, profile.options);

  await run('desktop-process-connects-four-steps-and-reverses', async p => {
    const read = () => p.locator('.process ol').evaluate(node => ({
      axis: node.dataset.processAxis,
      progress: Number(getComputedStyle(node).getPropertyValue('--process-progress')),
      steps: [...node.children].map(step => Number(getComputedStyle(step).getPropertyValue('--step-progress'))),
    }));
    const pose = async progress => {
      await p.locator('.process ol').evaluate((node, progress) => {
        const rect = node.getBoundingClientRect();
        const range = Math.max(rect.height, innerHeight * .4);
        window.scrollTo({ top: rect.top + scrollY - (innerHeight * .72 - range * progress), behavior: 'instant' });
      }, progress);
      await p.waitForFunction(progress => Math.abs(Number(getComputedStyle(document.querySelector('.process ol')).getPropertyValue('--process-progress')) - progress) < .025, progress);
      return read();
    };
    const before = await pose(.2);
    const after = await pose(.8);
    assert(before.axis === 'horizontal' && before.steps.length === 4, `desktop process lost its ordered track: ${JSON.stringify(before)}`);
    assert(after.progress > before.progress + .4 && after.steps.filter((step, index) => step > before.steps[index] + .1).length >= 2, `steps did not advance in sequence: ${JSON.stringify({ before, after })}`);
    const reversed = await pose(.2);
    assert(near(before.progress, reversed.progress, .025) && before.steps.every((step, index) => near(step, reversed.steps[index], .05)), `process reversal changed state: ${JSON.stringify({ before, reversed })}`);
    return { before, after, reversed };
  });

  for (const profile of [
    { name: 'desktop', options: {} },
    { name: 'mobile', options: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ]) await run(`footer-letters-assemble-and-return-${profile.name}`, async p => {
    await p.waitForFunction(() => document.querySelectorAll('.footer-letter').length === 6);
    const points = await p.locator('.footer-word').evaluate(node => ({
      early: innerHeight * .92,
      rest: innerHeight * .95 - Math.max(80, Math.min(innerHeight * .4, node.getBoundingClientRect().height * .75)) - 12,
    }));
    const read = () => p.locator('.footer-letter').evaluateAll(nodes => nodes.map(node => {
      const m = new DOMMatrix(getComputedStyle(node).transform);
      return { y: m.f, angle: Math.atan2(m.b, m.a) * 180 / Math.PI };
    }));
    await scrollAt(p, '.footer-word', points.early);
    await p.waitForFunction(() => Number(getComputedStyle(document.querySelector('.footer-word')).getPropertyValue('--word-progress')) < .6);
    const before = await read();
    assert(before[0].y > 10 && before[1].y < -10, `footer has no opposing letter movement: ${JSON.stringify(before)}`);
    await scrollAt(p, '.footer-word', points.rest);
    await p.waitForFunction(() => Number(getComputedStyle(document.querySelector('.footer-word')).getPropertyValue('--word-progress')) > .99);
    const settled = await read();
    assert(settled.every(letter => Math.abs(letter.y) < 1 && Math.abs(letter.angle) < 1), `footer never assembled: ${JSON.stringify(settled)}`);
    await scrollAt(p, '.footer-word', points.early);
    await p.waitForFunction(() => Number(getComputedStyle(document.querySelector('.footer-word')).getPropertyValue('--word-progress')) < .6);
    const reversed = await read();
    assert(before.every((letter, index) => samePose(letter, reversed[index])), `footer reversal changed its pose: ${JSON.stringify({ before, reversed })}`);
    return { before, settled, reversed };
  }, profile.options);

  await run('menu-exit-can-be-reversed-and-escape-keeps-focus', async p => {
    const summary = p.locator('.nav-menu summary');
    const details = p.locator('.nav-menu');
    await summary.click();
    await p.waitForFunction(() => document.querySelector('.nav-menu').open);
    // Clicks deliberately exercise pointerdown as well as click, including the
    // native details behavior; directly dispatching click would miss that race.
    await summary.click();
    await p.waitForFunction(() => document.querySelector('.nav-menu').dataset.closing === 'true');
    await summary.click();
    await p.waitForFunction(() => document.querySelector('.nav-menu').open && !document.querySelector('.nav-menu').dataset.closing);
    await p.waitForTimeout(220);
    assert(await details.evaluate(node => node.open), 'obsolete close completion collapsed the reopened menu');
    await p.keyboard.press('Escape');
    assert(await details.evaluate(node => !node.open), 'Escape did not close immediately');
    assert(await summary.evaluate(node => node === document.activeElement), 'Escape did not return focus to summary');
    await summary.click();
    await summary.click();
    await p.waitForFunction(() => !document.querySelector('.nav-menu').open);
    return { closeReversedByRealClick: true, escapeClosedImmediately: true, summaryFocusRestored: true, finalCloseCompleted: true };
  });

  await run('live-reduced-motion-clears-all-new-spatial-layers', async p => {
    await scrollAt(p, '#pacote', 500);
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await p.waitForFunction(() => document.querySelector('.people-hero').dataset.motionMode === 'static' && document.querySelector('#pacote').dataset.motionMode === 'static');
    const state = await p.evaluate(() => ({
      transforms: [...document.querySelectorAll('.hero-sculpture-parallax, .hero-sculpture-pointer, .scroll-frame-surface, .project-media-pan')].map(node => ({ className: node.className, transform: getComputedStyle(node).transform })),
      animations: document.getAnimations().filter(animation => animation.playState === 'running').length,
      canvas: document.querySelectorAll('canvas').length,
      engine: document.documentElement.dataset.scrollEngine,
      width: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    assert(state.transforms.every(node => node.transform === 'none'), `reduced motion left spatial layers: ${JSON.stringify(state.transforms)}`);
    assert(state.animations === 0 && state.canvas === 0 && state.engine === 'native' && state.width <= state.viewport + 1, `reduce fallback incomplete: ${JSON.stringify(state)}`);
    return state;
  });

  await run('contact-keyboard-focus-is-immediate-and-animation-free', async p => {
    await scrollAt(p, '.founder-contact', 300);
    const state = await p.locator('.founder-contact').first().evaluate(node => {
      node.focus({ preventScroll: true });
      const rect = node.getBoundingClientRect();
      const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      const ancestors = [];
      for (let ancestor = node; ancestor && ancestor.tagName !== 'MAIN'; ancestor = ancestor.parentElement) {
        const style = getComputedStyle(ancestor);
        ancestors.push({ className: ancestor.className, opacity: style.opacity, transform: style.transform });
      }
      return {
        active: node === document.activeElement,
        hit: node === hit || node.contains(hit),
        animations: document.getAnimations().filter(animation => animation.playState === 'running' && animation.effect?.target?.closest('#contato')).length,
        ancestors,
      };
    });
    assert(state.active && state.hit && state.animations === 0 && state.ancestors.every(node => node.opacity === '1' && node.transform === 'none'), `contact focus waited for motion: ${JSON.stringify(state)}`);
    return state;
  }, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  await run('large-font-fallback-neutralizes-new-masks-and-spatial-layers', async p => {
    const baseline = await p.locator('.person-kicker').first().evaluate(node => parseFloat(getComputedStyle(node).fontSize));
    await p.addStyleTag({ content: `.person-kicker { font-size: ${baseline * 2}px !important; }` });
    await p.waitForFunction(() => document.documentElement.hasAttribute('data-large-text') && document.querySelector('.people-hero').dataset.motionMode === 'mobile-flow');
    await scrollAt(p, '#pacote', 180);
    const state = await p.evaluate(() => ({
      chapterEnabled: [...document.querySelectorAll('.motion-chapter')].map(node => node.dataset.choreography),
      transforms: [...document.querySelectorAll('.hero-sculpture-parallax, .hero-sculpture-pointer, .scroll-frame-surface, .project-media-pan, .chapter-title-line > span, .price-motion-surface, .footer-letter')].map(node => getComputedStyle(node).transform),
      headingOverflow: [...document.querySelectorAll('.chapter-title-line')].map(node => getComputedStyle(node).overflow),
      fieldsVisible: [...document.querySelectorAll('.chapter-surface-clip')].some(node => getComputedStyle(node).display !== 'none'),
      width: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    assert(state.chapterEnabled.every(value => value === 'false') && state.transforms.every(value => value === 'none'), `large text retained spatial motion: ${JSON.stringify(state)}`);
    assert(state.headingOverflow.every(value => value === 'visible') && !state.fieldsVisible && state.width <= state.viewport + 1, `large text clipping/reflow failed: ${JSON.stringify(state)}`);
    return { method: 'double the measured person-kicker font to exercise existing large-text fallback; not physical browser zoom', ...state };
  }, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  const summary = { passed: results.filter(result => result.pass).length, failed: results.filter(result => !result.pass).length, results };
  if (summary.failed) throw new Error(JSON.stringify(summary));
  return summary;
}
