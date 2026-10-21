async page => {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const directory = path.resolve('docs/mobile-motion-2026-10-21/detail-frames');
  await fs.mkdir(directory, { recursive: true });
  const states = [];
  await page.reload();
  await page.waitForFunction(() => document.querySelectorAll('.footer-letter').length > 0);
  await page.locator('.footer-word').evaluate(node => scrollTo({ top: node.getBoundingClientRect().top + scrollY - 450, behavior: 'instant' }));
  for (const [delay, label] of [[10, 'early'], [40, 'middle'], [60, 'late'], [1000, 'rest']]) {
    await page.waitForTimeout(delay);
    const state = await page.locator('.footer-word').evaluate(node => [...node.querySelectorAll('.footer-letter')].map(letter => ({ transform: getComputedStyle(letter).transform, clip: getComputedStyle(letter).clipPath })));
    await page.screenshot({ path: path.join(directory, `footer-${label}.png`) });
    states.push({ scene: 'footer', label, state });
  }
  await page.locator('.nav-menu summary').tap();
  for (const [delay, label] of [[10, 'early'], [40, 'middle'], [60, 'late'], [700, 'rest']]) {
    await page.waitForTimeout(delay);
    const state = await page.locator('.nav-menu').evaluate(node => [...node.querySelectorAll('.menu-label')].map(label => ({ transform: getComputedStyle(label).transform, opacity: getComputedStyle(label).opacity })));
    await page.screenshot({ path: path.join(directory, `menu-${label}.png`) });
    states.push({ scene: 'menu', label, state });
  }
  for (const scene of ['footer', 'menu']) {
    const frames = states.filter(state => state.scene === scene && state.label !== 'rest');
    if (new Set(frames.map(frame => JSON.stringify(frame.state))).size < 3) throw new Error(`${scene} does not have three distinct intermediate states`);
  }
  await fs.writeFile(path.join(directory, 'states.json'), JSON.stringify(states, null, 2));
  return { frames: states.length, distinctIntermediateStatesPerScene: 3 };
}
