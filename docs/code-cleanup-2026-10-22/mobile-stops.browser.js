(async () => {
  const hero = document.querySelector('.people-hero');
  if (hero.dataset.mode !== 'mobile-story') throw new Error('The mobile story must be ready before this check.');
  const story = hero.querySelector('.people-story');
  const cards = [...hero.querySelectorAll('.person-card')];
  const headerHeight = document.querySelector('.site-header').getBoundingClientRect().height;
  const start = story.getBoundingClientRect().top + scrollY - headerHeight;
  const range = story.offsetHeight - (innerHeight - headerHeight);
  const order = [...cards.keys(), ...cards.slice(0, -1).map((_, index) => index).reverse()];
  const results = [];

  for (const index of order) {
    scrollTo({ top: start + range * index / (cards.length - 1), behavior: 'instant' });
    await new Promise((resolve, reject) => {
      const deadline = performance.now() + 4000;
      const check = () => {
        const card = cards[index];
        const photo = card.querySelector('.person-portrait');
        const copy = card.querySelector('.person-copy');
        const name = card.querySelector('.person-name');
        const nameRect = name.getBoundingClientRect();
        const photoRect = photo.getBoundingClientRect();
        const photoStyle = getComputedStyle(photo);
        const readable = card.dataset.active === 'true' && Number(photoStyle.opacity) > .99
          && Number(getComputedStyle(copy).opacity) > .99 && nameRect.top >= headerHeight - 1
          && nameRect.bottom <= innerHeight && photoRect.top >= headerHeight - 1
          && photoRect.bottom <= innerHeight;
        if (readable) {
          results.push({ index, name: name.getAttribute('aria-label'), readable: true });
          return resolve();
        }
        if (performance.now() > deadline) return reject(new Error(`Portrait/name did not settle: ${index}`));
        requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    });
  }
  return {
    viewport: [innerWidth, innerHeight],
    mode: hero.dataset.mode,
    renderer: hero.dataset.renderer,
    storyHeight: story.offsetHeight,
    touchPoints: navigator.maxTouchPoints,
    results,
    overflow: document.documentElement.scrollWidth > innerWidth,
  };
})()
