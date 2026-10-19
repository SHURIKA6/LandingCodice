/** Each study animates only in response to its own visible interaction. */
export function setupForma() {
  const stage = document.querySelector<HTMLElement>('[data-forma-stage]');
  const button = document.querySelector<HTMLButtonElement>('[data-forma-toggle]');
  const status = document.querySelector<HTMLElement>('[data-forma-status]');
  if (!stage || !button || !status) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  stage.dataset.enhanced = 'true';
  button.hidden = false;
  button.addEventListener('click', () => {
    const open = stage.classList.toggle('is-open');
    button.setAttribute('aria-pressed', String(open));
    const label = button.querySelector('span');
    if (label) label.textContent = open ? 'Reunir a ideia' : 'Desdobrar a ideia';
    status.textContent = open ? 'Apresentação, serviços e contato. Uma presença só sua.' : 'Uma ideia. Tudo no lugar.';
  });
  let frame = 0;
  let x = 0;
  let y = 0;
  const reset = () => {
    cancelAnimationFrame(frame); frame = 0;
    stage.style.removeProperty('--tilt-x'); stage.style.removeProperty('--tilt-y');
  };
  stage.addEventListener('pointermove', (event) => {
    if (reduce.matches || document.hidden || event.pointerType !== 'mouse') return;
    const rect = stage.getBoundingClientRect();
    x = ((event.clientX - rect.left) / rect.width - .5) * 12;
    y = -((event.clientY - rect.top) / rect.height - .5) * 8;
    if (!frame) frame = requestAnimationFrame(() => {
      stage.style.setProperty('--tilt-x', `${x}deg`); stage.style.setProperty('--tilt-y', `${y}deg`); frame = 0;
    });
  });
  stage.addEventListener('pointerleave', reset);
  document.addEventListener('visibilitychange', reset);
  reduce.addEventListener('change', reset);
  new IntersectionObserver(([entry]) => {
    stage.dataset.active = String(entry.isIntersecting && !document.hidden);
    if (!entry.isIntersecting) reset();
  }).observe(stage);
}

export function setupFluxo() {
  const canvas = document.querySelector<HTMLElement>('[data-fluxo-canvas]');
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-fluxo-tab]')];
  const status = document.querySelector<HTMLElement>('[data-fluxo-status]');
  if (!canvas || !status) return;
  const messages: Record<string, string> = {
    services: 'Serviços em evidência: explique o que você faz e para quem.',
    work: 'Trabalhos em evidência: apresente fotos reais do que você já realizou.',
    contact: 'Contato em evidência: facilite o próximo passo de quem quer conversar.',
  };
  buttons.forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => {
      const focus = button.dataset.fluxoTab ?? 'services';
      canvas.dataset.focus = focus;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      status.textContent = messages[focus];
    });
  });
}

export function setupRitmo() {
  const stage = document.querySelector<HTMLElement>('[data-ritmo-stage]');
  const button = document.querySelector<HTMLButtonElement>('[data-ritmo-play]');
  if (!stage || !button) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = true;
  let frame = 0;
  let playback = 0;
  let target = 0;
  const cancel = () => { cancelAnimationFrame(frame); cancelAnimationFrame(playback); frame = 0; playback = 0; };
  const render = () => {
    frame = 0;
    if (!visible || document.hidden || reduce.matches) return;
    target = Math.min(1, Math.max(0, -stage.getBoundingClientRect().top / (stage.offsetHeight * .8)));
    stage.style.setProperty('--progress', target.toFixed(4));
  };
  const onScroll = () => {
    if (!visible || document.hidden || reduce.matches || frame || playback) return;
    frame = requestAnimationFrame(render);
  };
  const sync = () => {
    cancel();
    button.hidden = reduce.matches;
    if (reduce.matches) stage.style.removeProperty('--progress');
    else if (!document.hidden && visible) render();
    stage.dataset.active = String(visible && !document.hidden && !reduce.matches);
  };
  button.addEventListener('click', () => {
    if (reduce.matches || !visible || document.hidden) return;
    cancel();
    const start = performance.now();
    const animate = (now: number) => {
      if (document.hidden || !visible || reduce.matches) { sync(); return; }
      const time = Math.min(1, (now - start) / 1400);
      stage.style.setProperty('--progress', String(target + Math.sin(time * Math.PI) * .85));
      if (time < 1) playback = requestAnimationFrame(animate);
      else { playback = 0; render(); }
    };
    playback = requestAnimationFrame(animate);
  });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(stage);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  document.addEventListener('visibilitychange', sync);
  reduce.addEventListener('change', sync);
  sync();
}
