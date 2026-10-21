async page => {
  const fs = await import('node:fs/promises');
  const baseline = [];
  for (const viewport of [{width:1024,height:768},{width:1280,height:740},{width:1366,height:768},{width:1440,height:1000},{width:1920,height:1080}]) {
    await page.setViewportSize(viewport);
    await page.goto('http://localhost:4321/', {waitUntil:'networkidle'});
    await page.waitForFunction(() => document.querySelector('.people-hero').dataset.motionMode === 'desktop');
    baseline.push(await page.locator('.hero-intro').evaluate((node,viewport) => ({...viewport, height:node.getBoundingClientRect().height}),viewport));
  }
  await fs.writeFile('docs/blue-sculpture-2026-10-21/intro-baseline.json',JSON.stringify(baseline,null,2));
  return baseline;
}
