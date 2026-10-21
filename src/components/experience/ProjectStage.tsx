'use client';

import { useEffect, useRef, useState } from 'react';
import { Arrow } from './Arrow';
import { ScrollFrame } from './ScrollFrame';
import { useMotionMode } from './useMotionMode';
import './project-motion.css';

const views = [
  { name: 'Apresentação', src: '/media/corretor-poster.webp', alt: 'Captura real da apresentação e do catálogo público do Corretor.', description: 'Uma apresentação própria para reunir imóveis, informações e fotos.' },
  { name: 'Catálogo e filtros', src: '/media/corretor-catalog.webp', alt: 'Captura real do catálogo do Corretor, com filtros e anúncios de imóveis.', description: 'Filtros de busca para explorar o catálogo e encontrar os imóveis.' },
] as const;

export function ProjectStage({ repositoryHref, demoHref }: { repositoryHref: string; demoHref: string }) {
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [loadCatalog, setLoadCatalog] = useState(false);
  const mode = useMotionMode();
  const requested = useRef(0);
  const catalogReady = useRef(false);
  const mounted = useRef(false);
  const current = views[displayed];

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  const selectView = (index: number) => {
    requested.current = index;
    setSelected(index);
    if (index === 0 || catalogReady.current) setDisplayed(index);
    else setLoadCatalog(true);
  };

  const revealCatalog = async (image: HTMLImageElement) => {
    // Keep the server-rendered photograph in place until the new pixels are ready.
    try { await image.decode(); } catch { /* A loaded image may already be decoded. */ }
    if (!mounted.current || !image.complete || image.naturalWidth === 0) return;
    // Establish the hidden layer even when the browser resolves a cache hit before paint.
    void window.getComputedStyle(image).opacity;
    catalogReady.current = true;
    if (requested.current === 1) setDisplayed(1);
  };

  const keepPresentation = () => {
    catalogReady.current = false;
    requested.current = 0;
    setSelected(0);
    setDisplayed(0);
    setLoadCatalog(false);
  };

  return <div className="project-stage" data-motion-mode={mode}>
    <ScrollFrame><figure className="project-browser"><div className="browser-bar"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>Corretor / apresentação e catálogo</span><Arrow diagonal /></div><div className="project-screen" aria-busy={selected !== displayed}>
      <img className="project-capture project-capture-base" src={views[0].src} alt={views[0].alt} aria-hidden={displayed !== 0} width="1440" height="900" loading="lazy" />
      {loadCatalog && <img className="project-capture project-capture-next" data-visible={displayed === 1} src={views[1].src} alt={views[1].alt} aria-hidden={displayed !== 1} width="1440" height="900" onLoad={event => { void revealCatalog(event.currentTarget); }} onError={keepPresentation} />}
    </div><figcaption>Captura real · 17/10/2026</figcaption></figure></ScrollFrame>
    <div className="project-controls"><div className="view-buttons" role="group" aria-label="Escolher captura do Corretor">{views.map((view, index) => <button key={view.src} type="button" aria-pressed={selected === index} data-loading={selected === index && selected !== displayed} onClick={() => selectView(index)}>{view.name}<span aria-hidden="true">↗</span></button>)}</div><p aria-live="polite">{current.description}</p><div className="project-links"><a className="text-link" href={demoHref} target="_blank" rel="noopener noreferrer">Ver demonstração <Arrow diagonal /><span className="sr-only"> (abre em outra aba)</span></a><a className="text-link" href={repositoryHref} target="_blank" rel="noopener noreferrer">Explorar o código <Arrow diagonal /><span className="sr-only"> no GitHub (abre em outra aba)</span></a></div></div>
    <noscript><style>{'.view-buttons{display:none}'}</style><figure className="project-noscript"><img src={views[1].src} alt={views[1].alt} width="1440" height="900" loading="lazy" /><figcaption>Catálogo e filtros · captura real de 17/10/2026</figcaption></figure></noscript>
  </div>;
}
