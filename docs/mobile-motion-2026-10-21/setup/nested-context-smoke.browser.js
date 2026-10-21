async (page) => {
  const browser = page.context().browser();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  try {
    const current = await context.newPage();
    await current.goto(new URL(page.url()).origin, { waitUntil: 'networkidle' });
    await current.locator('#hero-title').waitFor();
    await current.waitForTimeout(400);
    return { nestedContextOpened: true, title: await current.title(), viewport: current.viewportSize() };
  } finally { await context.close(); }
}
