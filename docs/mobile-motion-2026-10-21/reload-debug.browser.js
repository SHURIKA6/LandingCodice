async page => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.reload();
  const state = () => page.evaluate(() => ({ y: scrollY, mode: document.querySelector('.people-hero').dataset.motionMode,
    active: document.querySelector('.person-card[data-active=true] .person-name')?.getAttribute('aria-label'),
    hero: document.querySelector('.people-hero').getBoundingClientRect().toJSON(),
    cards: [...document.querySelectorAll('.person-card')].map(node => node.getBoundingClientRect().toJSON()) }));
  await page.waitForFunction(() => document.querySelector('.people-hero').dataset.renderer === 'three');
  await page.evaluate(() => scrollTo({ top: (document.querySelector('.people-hero').offsetHeight - innerHeight) * .5, behavior: 'instant' }));
  await page.waitForTimeout(350);
  const before = await state();
  await page.reload({ waitUntil: 'domcontentloaded' });
  const after = [];
  for (let i = 0; i < 10; i++) { await page.waitForTimeout(100); after.push(await state()); }
  return { before, after };
}
