'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { TeamMember } from '../../data/team';
import type { MotionMode } from './useMotionMode';
import { getMobileStoryFrame } from './mobilePortraitMotion';

export function PersonCard({ member, index, active, mode, progress, onReady, onError }: {
  member: TeamMember; index: number; active: boolean; mode: MotionMode;
  progress: MotionValue<number>; onReady: (index: number) => void; onError: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const entered = useInView(ref, { once: true, amount: .12 });
  const { scrollYProgress: local } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const pose = useTransform(progress, value => getMobileStoryFrame(value).panels[index]);
  const x = useTransform(pose, value => `${value.xPercent}%`);
  const y = useTransform(pose, value => `${value.yPercent}%`);
  const scale = useTransform(pose, value => value.scale);
  const rotate = useTransform(pose, value => value.rotation);
  const opacity = useTransform(pose, value => value.opacity);
  const nameY = useTransform(pose, value => `${value.nameYPercent}%`);
  const nameOpacity = useTransform(pose, value => value.nameOpacity);
  const zIndex = useTransform(pose, value => value.zIndex);
  const flowY = useTransform(local, [0, .32, .65, 1], [64, 0, 0, -24]);
  const flowScale = useTransform(local, [0, .32, .65, 1], [.82, 1, 1, .94]);
  const flowRotate = useTransform(local, [0, .38, 1], [index % 2 ? -3 : 3, 0, index % 2 ? 1 : -1]);
  const flowNameY = useTransform(local, [0, .42, 1], [40, 0, -12]);
  useEffect(() => {
    let current = true;
    const node = image.current;
    if (node?.complete && node.naturalWidth > 0) void node.decode().catch(() => {}).then(() => { if (current) onReady(index); });
    return () => { current = false; };
  }, [index, onReady]);
  const story = mode === 'mobile-story';
  const flow = mode === 'mobile-flow';
  return <motion.article ref={ref} className="person-card" data-active={active} data-entered={entered} aria-labelledby={`person-${member.id}`} style={story ? { zIndex } : undefined}>
    <div className="person-copy-mask"><motion.div className="person-copy" style={story ? { y: nameY, opacity: nameOpacity } : flow ? { y: flowNameY } : undefined}>
      <p className="person-kicker">Prazer, <span aria-hidden="true">{String(index + 1).padStart(2, '0')} / 03</span></p>
      <h2 className="person-name" id={`person-${member.id}`} aria-label={member.name}><span><span>{member.firstName}</span></span>{' '}<span><span>{member.lastName}<i aria-hidden="true">.</i></span></span></h2>
      <p className="person-signature">Gente que faz a Codice.</p>
    </motion.div></div>
    <motion.figure className="person-portrait" style={story ? { x, y, scale, rotate, opacity } : flow ? { y: flowY, scale: flowScale, rotate: flowRotate } : undefined}>
      <img ref={image} src={member.portrait.src} alt={member.portrait.alt} width={member.portrait.width} height={member.portrait.height}
        loading={mode.startsWith('mobile') || index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} draggable="false"
        onLoad={event => { const node = event.currentTarget; void node.decode().catch(() => {}).then(() => onReady(index)); }} onError={onError} />
      <figcaption>Codice / {member.firstName}</figcaption>
    </motion.figure>
  </motion.article>;
}
