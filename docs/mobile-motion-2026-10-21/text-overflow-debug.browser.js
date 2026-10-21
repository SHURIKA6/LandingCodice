async page => {
  await page.waitForFunction(() => document.querySelector('.people-hero').dataset.motionMode === 'mobile-story');
  await page.addStyleTag({ content: 'html{-webkit-text-size-adjust:200%;text-size-adjust:200%}' });
  await page.waitForTimeout(1200);
  const before = await page.evaluate(() => ({ client: document.documentElement.clientWidth, header: document.querySelector('.site-header').getBoundingClientRect().width, scroll: document.documentElement.scrollWidth }));
  await page.addStyleTag({ content: 'html[data-large-text] .site-header{width:100svw} html[data-large-text] .package-conditions summary>span{flex-shrink:0;margin-inline:8px}' });
  await page.waitForTimeout(300);
  return page.evaluate(before => {
    const width = document.documentElement.clientWidth;
    const nodes = [...document.querySelectorAll('body *')].filter(node => !node.closest('.sr-only') && !node.closest('script,style')).flatMap(node => {
      const rect = node.getBoundingClientRect();
      if (rect.width && rect.right > width + .5) return [{ tag: node.tagName, className: node.className, right: rect.right, left: rect.left, width: rect.width, overflow: getComputedStyle(node).overflow, text: node.textContent.slice(0,70) }];
      return [];
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const texts = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.textContent.trim() || node.parentElement.closest('.sr-only,script,style')) continue;
      const range = document.createRange(); range.selectNodeContents(node);
      for (const rect of range.getClientRects()) if (rect.right > width + .5) texts.push({ parent: node.parentElement.className, text: node.textContent, right: rect.right });
    }
    return { before, width, scrollWidth: document.documentElement.scrollWidth, nodes, texts };
  }, before);
}
