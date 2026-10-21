async (page) => {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const directory = path.resolve('docs/mobile-motion-2026-10-21/captures');
  await fs.mkdir(directory, { recursive: true });
  await page.goto('http://localhost:4321/');
  await page.waitForFunction(() => document.querySelector('.people-hero').dataset.motionMode === 'mobile-story');
  const results = [];
  for (const [width, height] of [[390, 844], [320, 568], [768, 1024]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(1100);
    await page.screenshot({ path: path.join(directory, 'opening-' + width + '.png') });
    for (const progress of [.08, .23, .28, .33, .5, .67, .72, .77, .92]) {
      await page.locator('.people-story').evaluate((node, value) => {
        const header = document.querySelector('.site-header').getBoundingClientRect().height;
        scrollTo({ top: node.getBoundingClientRect().top + scrollY - header + (node.offsetHeight - (innerHeight - header)) * value, behavior: 'instant' });
      }, progress);
      await page.waitForTimeout(100);
      await page.screenshot({ path: path.join(directory, 'people-' + width + '-' + progress + '.png') });
      if ([.08, .5, .92].includes(progress)) results.push(await page.locator('.person-card[data-active=true]').evaluate((node, dimensions) => {
        const box = selector => node.querySelector(selector).getBoundingClientRect().toJSON();
        return { ...dimensions, name: node.querySelector('.person-name').getAttribute('aria-label'), photo: box('.person-portrait'), copy: box('.person-copy'), stage: document.querySelector('.people-stage').getBoundingClientRect().toJSON() };
      }, { width, height, progress }));
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [selector, name] of [['#trabalho', 'work'], ['.project-browser', 'corretor'], ['.roger-case', 'roger'], ['#pacote', 'offer'], ['.process', 'process'], ['#contato', 'contact'], ['.footer-word', 'footer']]) {
    for (const [offset, frame] of [[700, 'arrival'], [450, 'middle'], [100, 'read']]) {
      await page.locator(selector).evaluate((node, offset) => scrollTo({ top: node.getBoundingClientRect().top + scrollY - offset, behavior: 'instant' }), offset);
      await page.waitForTimeout(frame === 'read' ? 1000 : 120);
      await page.screenshot({ path: path.join(directory, name + '-' + frame + '.png') });
    }
  }
  await page.locator('.nav-menu summary').tap();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(directory, 'menu.png') });
  await page.keyboard.press('Escape');
  await fs.writeFile(path.join(directory, 'measurements.json'), JSON.stringify(results, null, 2));
  return { captures: 55, restingMeasurements: results };
}
