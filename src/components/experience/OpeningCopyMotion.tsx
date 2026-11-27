'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionMode } from './useMotionMode';
import { useLargeText } from './useLargeText';

/**
 * Scroll-linked handoff for the opening copy (#inicio -> #a-gente).
 * Purpose (continuity): the words drift up and fade as the sculpture arcs away,
 * so the first scroll reads as leaving the opening, not as content chasing it.
 * Transform + opacity only; static / reduced-motion / enlarged-text keep plain HTML.
 */
export function OpeningCopyMotion({ children }: { children: ReactNode }) {
  const copy = useRef<HTMLDivElement>(null);
  const mode = useMotionMode();
  const largeText = useLargeText();
  const { scrollYProgress } = useScroll({ target: copy, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const moving = mode !== 'static' && !largeText;

  return <motion.div ref={copy} className="opening-copy" style={moving ? { y, opacity } : undefined}>
    {children}
  </motion.div>;
}
