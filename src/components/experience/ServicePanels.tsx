'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useMotionMode } from './useMotionMode';
import { teamMembers } from '../../data/team';
import { services, servicesClosing } from '../../data/services';
import './service-panels.css';

const STOP_COUNT = services.length + 1; // panels + closing stop

function memberById(id: (typeof services)[number]['memberId']) {
  return teamMembers.find(member => member.id === id)!;
}

function ServicePanelItem({ service, index, progress, enhanced }: {
  service: (typeof services)[number];
  index: number;
  progress: MotionValue<number>;
  enhanced: boolean;
}) {
  const member = memberById(service.memberId);
  const repository = service.repository;
  const total = STOP_COUNT;
  const start = index / total;
  const end = (index + 1) / total;
  const enterEnd = start + (end - start) * 0.26;
  const exitStart = start + (end - start) * 0.74;
  const dir = service.side === 'left' ? -1 : 1;

  const first = index === 0;
  const opacityIn = first ? 1 : 0;
  const xIn = first ? 0 : dir * 48;

  const opacity = useTransform(progress, [start, enterEnd, exitStart, end], [opacityIn, 1, 1, 0]);
  const mediaX = useTransform(progress, [start, enterEnd, exitStart, end], [xIn, 0, 0, dir * 48]);
  const textX = useTransform(progress, [start, enterEnd, exitStart, end], [-xIn * 0.6, 0, 0, -dir * 28]);
  const textOpacity = useTransform(progress, [start, enterEnd, exitStart, end], [opacityIn, 1, 1, 0]);

  return (
    <motion.article className="service-panel" data-side={service.side} aria-labelledby={`service-${service.id}`}
      style={enhanced ? { opacity, x: 0 } : undefined}>
      <motion.div className="service-panel-media" style={enhanced ? { x: mediaX } : undefined}>
        <a className="service-panel-media-link" href={repository.url} target="_blank" rel="noopener noreferrer" aria-label={`${repository.owner}/${repository.repo} no GitHub (abre em outra aba)`}>
          <img src={repository.print.src} alt={repository.print.alt} width={repository.print.width} height={repository.print.height} loading="lazy" decoding="async" draggable={false} />
        </a>
        <figcaption className="service-panel-caption">{repository.owner}/{repository.repo} · GitHub</figcaption>
      </motion.div>
      <motion.div className="service-panel-body" style={enhanced ? { x: textX, opacity: textOpacity } : undefined}>
        <p className="eyebrow service-panel-kicker">{service.kicker}</p>
        <h3 id={`service-${service.id}`} className="service-panel-phrase">{service.phrase}</h3>
        <p className="service-panel-signature">{member.lastName}, {member.firstName}</p>
        <a className="text-link service-panel-repo" href={repository.url} target="_blank" rel="noopener noreferrer">
          Explorar este repositório <span className="sr-only">(abre em outra aba)</span>
        </a>
      </motion.div>
    </motion.article>
  );
}

function ServiceClosing({ progress, enhanced }: { progress: MotionValue<number>; enhanced: boolean }) {
  const start = services.length / STOP_COUNT;
  const opacity = useTransform(progress, [start, start + 0.1, 1], [0, 1, 1]);
  return (
    <motion.div className="service-panels-closing" style={enhanced ? { opacity } : undefined}>
      <p className="service-panels-closing-phrase">{servicesClosing}</p>
      <a className="text-link service-panels-closing-link" href="#trabalho">Conheça o que fazemos <span className="service-panels-closing-arrow" aria-hidden="true">↗</span></a>
    </motion.div>
  );
}

export function ServicePanels() {
  const section = useRef<HTMLElement>(null);
  const mode = useMotionMode();
  const enhanced = mode === 'desktop';
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });

  return (
    <section ref={section} className="service-panels" data-enhanced={enhanced} aria-label="O que a gente faz">
      <div className="service-panels-track">
        <div className="service-panels-viewport">
          {services.map((service, index) => (
            <ServicePanelItem key={service.id} service={service} index={index} progress={scrollYProgress} enhanced={enhanced} />
          ))}
          <ServiceClosing progress={scrollYProgress} enhanced={enhanced} />
        </div>
      </div>
    </section>
  );
}
