'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useMotionMode } from './useMotionMode';

/**
 * The team photo travels inside its stable frame (.opening-photo-frame clips it), with the scroll
 * travel the old plate had. The travel only starts once the frame's top has left the screen
 * ('start start'), so the edge it uncovers is always above the viewport: no overscan is needed and the
 * photo keeps its exact crop, faces whole, at rest.
 */
export function OpeningBackdrop({ children }: { children: ReactNode }) {
  const backdrop = useRef<HTMLDivElement>(null);
  const mode = useMotionMode();
  const inView = useInView(backdrop);
  const { scrollYProgress } = useScroll({ target: backdrop, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, mode === 'desktop' ? 48 : 24]);
  const moving = inView && (mode === 'desktop' || mode === 'mobile-flow');

  return <motion.div ref={backdrop} className="opening-backdrop" data-motion={moving} style={moving ? { y } : undefined}>
    {children}
  </motion.div>;
}
