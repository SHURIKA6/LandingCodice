'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Arrow } from './Arrow';
import { useReducedPreference } from './useReducedPreference';

const views = [
  { id: 'presentation', name: 'Apresentação', src: '/media/corretor-poster.webp', alt: 'Página pública real do Corretor com apresentação e catálogo de imóveis.', description: 'Os imóveis, as informações e as fotos reunidos em uma apresentação própria.' },
  { id: 'catalog', name: 'Catálogo', src: '/media/corretor-catalog.webp', alt: 'Captura real do catálogo do Corretor com filtros e anúncios de imóveis.', description: 'Filtros de busca para ajudar o visitante a explorar os imóveis disponíveis.' },
];

export function ProjectStage({ repositoryHref }: { repositoryHref: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const reduce = useReducedPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const tilt = useTransform(scrollYProgress, [0, .45, 1], [-3, 0, 2]);
  const { name, src, alt, description } = views[selected];
  return <div ref={ref} className="project-stage">
    <motion.figure className="project-browser" style={{ rotate: reduce ? 0 : tilt }}>
      <div className="browser-bar"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>Corretor · ambiente de demonstração</span><Arrow diagonal /></div>
      <div className="project-screen"><AnimatePresence initial={false} mode="sync"><motion.img key={src} src={src} alt={alt} width="1440" height="900" loading="lazy" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .3 }} /></AnimatePresence></div>
      <figcaption><span>Projeto realizado pela dupla</span><span>Captura real · 17/10/2026</span></figcaption>
    </motion.figure>
    <div className="project-controls"><div className="view-buttons" role="group" aria-label="Escolher captura do projeto">{views.map((view, index) => <button key={view.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{view.name}<span aria-hidden="true" /></button>)}</div><p aria-live="polite"><span className="sr-only">{name}. </span>{description}</p><a className="text-link" href={repositoryHref} target="_blank" rel="noopener noreferrer">Ver o código no GitHub <Arrow diagonal /><span className="sr-only"> (abre em outra aba)</span></a></div>
    <noscript><style>{'.view-buttons{display:none}'}</style><p className="project-static-note">Captura da apresentação e do catálogo do projeto. O código está disponível no link acima.</p></noscript>
  </div>;
}
