async (page) => {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const directory = path.resolve('docs/mobile-motion-2026-10-21/tour-frames');
  await fs.mkdir(directory, { recursive: true });
  const frames = [];
  const shot = async name => {
    const file = `${name}.png`;
    await page.screenshot({ path: path.join(directory, file) });
    frames.push({ file, scrollY: await page.evaluate(() => scrollY) });
  };
  const scroll = async (top, duration = 1800) => page.evaluate(({ top, duration }) => new Promise(resolve => {
    const from = scrollY, start = performance.now();
    const frame = now => {
      const p = Math.min(1, (now - start) / duration);
      const ease = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      window.scrollTo({ top: from + (top - from) * ease, behavior: 'instant' });
      if (p < 1) requestAnimationFrame(frame); else resolve();
    };
    requestAnimationFrame(frame);
  }), { top, duration });
  const target = (selector, offset = 120) => page.locator(selector).evaluate((node, offset) => node.getBoundingClientRect().top + scrollY - offset, offset);
  const storyTarget = progress => page.locator('.people-story').evaluate((node, progress) => {
    const header = document.querySelector('.site-header').getBoundingClientRect().height;
    return node.getBoundingClientRect().top + scrollY - header + (node.offsetHeight - (innerHeight - header)) * progress;
  }, progress);
  const scene = async (selector, name) => {
    await scroll(await target(selector, 760), 1800);
    const moving = scroll(await target(selector, 110), 1500);
    await page.waitForTimeout(180); await shot(`${name}-early`);
    await page.waitForTimeout(330); await shot(`${name}-middle`);
    await page.waitForTimeout(330); await shot(`${name}-late`);
    await moving; await page.waitForTimeout(650);
  };
  await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelector('.people-hero')?.dataset.introduced === 'true');
  for (const [delay, name] of [[90, 'early'], [230, 'middle'], [300, 'late']]) {
    await page.waitForTimeout(delay); await shot(`opening-${name}`);
  }
  await page.waitForFunction(() => document.querySelector('.people-hero')?.dataset.motionMode === 'mobile-story');
  await scroll(await storyTarget(.08), 1800); await page.waitForTimeout(700);
  for (const [progress, name] of [[.23, 'early'], [.28, 'middle'], [.33, 'late']]) {
    await scroll(await storyTarget(progress), 500); await shot(`portrait-handoff-${name}`);
  }
  await scroll(await storyTarget(.5), 800); await page.waitForTimeout(700);
  await scroll(await storyTarget(.92), 2000); await page.waitForTimeout(700);
  await scroll(await storyTarget(.5), 1800); await page.waitForTimeout(450);
  await scroll(await storyTarget(.92), 1500);
  await scene('#trabalho', 'chapter-handoff');
  await scene('.project-browser', 'corretor');
  await page.getByRole('button', { name: 'Catálogo e filtros' }).tap();
  await page.waitForTimeout(900);
  await page.getByRole('button', { name: 'Apresentação' }).tap();
  await page.waitForTimeout(550);
  await scene('.roger-case', 'roger');
  await scene('.package-price', 'offer');
  await scene('.process', 'process-entry');
  for (const [index, name] of [[0, 'early'], [1, 'middle'], [3, 'late']]) {
    await scroll(await target(`.process li:nth-child(${index + 1})`, 300), 900);
    await shot(`process-trail-${name}`);
  }
  await scene('#contato', 'contact');
  await scene('.footer-word', 'footer');
  await scroll(await page.evaluate(() => document.documentElement.scrollHeight), 1100);
  await page.locator('.nav-menu summary').tap();
  await page.waitForTimeout(160); await shot('menu-early');
  await page.waitForTimeout(180); await shot('menu-middle');
  await page.waitForTimeout(300); await shot('menu-late');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  await fs.writeFile(path.join(directory, 'frames.json'), JSON.stringify(frames, null, 2));
  return { viewport: { width: 390, height: 844 }, frames: frames.length, mode: await page.locator('.people-hero').getAttribute('data-motion-mode') };
}
