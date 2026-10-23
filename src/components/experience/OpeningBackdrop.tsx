'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useMotionMode } from './useMotionMode';

/** Plate and video travel together beneath the untransformed reading scrim. */
export function OpeningBackdrop({ children }: { children: ReactNode }) {
  const backdrop = useRef<HTMLDivElement>(null);
  const mode = useMotionMode();
  const inView = useInView(backdrop);
  const { scrollYProgress } = useScroll({ target: backdrop, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, mode === 'desktop' ? 48 : 24]);
  const moving = inView && (mode === 'desktop' || mode === 'mobile-flow');

  return <motion.div ref={backdrop} className="opening-backdrop" data-motion={moving}
    style={moving ? { y, scale: mode === 'desktop' ? 1.1 : 1.06 } : undefined}>
    {children}
  </motion.div>;
}
