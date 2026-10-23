(async () => {
  await document.fonts.ready;
  const images = [...document.querySelectorAll('main img')];
  images.forEach(image => { image.loading = 'eager'; });
  await Promise.all(images.map(image => image.decode().catch(() => {})));
  const selectors = [
    '#inicio', '#a-gente', '#trabalho', '#pacote', '#contato',
    '.case-heading', '.case-details', '.roger-copy', '.package-grid',
    '.package-heading', '.package-details', '.package-conditions', '.founders', '.footer-word',
  ];
  const geometry = Object.fromEntries(selectors.map(selector => {
    const element = document.querySelector(selector);
    const rect = element.getBoundingClientRect();
    return [selector, Object.fromEntries(Object.entries({
      x: rect.x, y: rect.y + scrollY, width: rect.width, height: rect.height,
    }).map(([key, value]) => [key, Math.round(value * 100) / 100]))];
  }));
  return {
    viewport: { width: innerWidth, height: innerHeight },
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    text: document.querySelector('main').innerText.replace(/\s+/g, ' ').trim(),
    links: [...document.querySelectorAll('a')].map(link => ({
      text: link.textContent.replace(/\s+/g, ' ').trim(), href: link.getAttribute('href'),
    })),
    imageFailures: images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src),
    overflow: document.documentElement.scrollWidth > innerWidth,
    geometry,
  };
})()
