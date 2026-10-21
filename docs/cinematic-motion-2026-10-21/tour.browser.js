async (page) => {
  const browser = page.context().browser();
  const origin = new URL(page.url()).origin;
  const output = process.cwd().replaceAll('\\', '/') + '/docs/cinematic-motion-2026-10-21/captures/';
  const results = [];
  for (const profile of [
    { name: 'desktop', viewport: { width: 1440, height: 1000 } },
    { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  ]) {
    const { name, ...options } = profile;
    const context = await browser.newContext({ ...options, reducedMotion: 'no-preference' });
    try {
      const p = await context.newPage();
      const errors = [];
      p.on('pageerror', error => errors.push(error.message));
      await p.goto(origin, { waitUntil: 'networkidle' });
      await p.waitForFunction(() => document.querySelector('.people-hero')?.dataset.motionMode !== 'static');
      await p.waitForFunction(() => document.getAnimations().every(animation => animation.playState !== 'running'));
      const move = async (target, duration = 900) => {
        await p.evaluate(({ target, duration }) => new Promise(resolve => {
          const start = scrollY;
          const began = performance.now();
          const frame = now => {
            const t = Math.min(1, (now - began) / duration);
            const eased = t * t * (3 - 2 * t);
            window.scrollTo({ top: start + (target - start) * eased, behavior: 'instant' });
            if (t < 1) requestAnimationFrame(frame); else resolve();
          };
          requestAnimationFrame(frame);
        }), { target, duration });
        await p.waitForTimeout(180);
      };
      const position = (selector, top) => p.locator(selector).first().evaluate((node, top) => node.getBoundingClientRect().top + scrollY - top, top);
      const capture = async label => {
        const file = `tour-${profile.name}-${label}.png`;
        await p.screenshot({ path: output + file });
        const state = await p.evaluate(() => ({ y: scrollY, width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
        if (state.scrollWidth > state.width + 1) throw new Error(`Overflow in ${file}`);
        results.push({ profile: profile.name, label, file, ...state });
      };
      await capture('opening');
      await move(240); await capture('sculpture-arc');
      const people = await p.locator(profile.name === 'mobile' ? '.people-story' : '.people-hero').evaluate((node, mobile) => {
        const header = mobile ? document.querySelector('.site-header').getBoundingClientRect().height : 0;
        return node.getBoundingClientRect().top + scrollY - header + (node.offsetHeight - (innerHeight - header)) * .5;
      }, profile.name === 'mobile');
      await move(people, 1400); await capture('eduardo');
      await move(await position('#trabalho', profile.viewport.height * .56), 1400); await capture('chapter-wipe');
      await move(await position('#trabalho', 100)); await capture('work');
      const frame = await p.locator('.project-stage .scroll-frame').evaluate(node => node.getBoundingClientRect().top + scrollY + node.offsetHeight / 2 - innerHeight / 2);
      await move(frame, 1200); await capture('project');
      await move(frame + profile.viewport.height * .3); await capture('project-reading');
      await move(await position('.roger-media', profile.viewport.height * .25), 1600); await capture('roger');
      await move(await position('#pacote', profile.viewport.height * .56), 1500); await capture('offer-arrival');
      await move(await position('.package-price', profile.viewport.height * .32)); await capture('offer');
      await move(await position('.process ol', profile.viewport.height * .66), 1500); await capture('process-arrival');
      await move(await position('.process ol', profile.name === 'mobile' ? -100 : 80), 1500); await capture('process');
      await move(await position('#contato', profile.viewport.height * .55), 1200); await capture('contact-arrival');
      await move(await position('#contato', 90)); await capture('contact');
      await move(await p.evaluate(() => document.documentElement.scrollHeight), 1500); await capture('footer');
      if (errors.length) throw new Error(errors.join('; '));
    } finally { await context.close(); }
  }
  return { passed: results.length, results };
}
