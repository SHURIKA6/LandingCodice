'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useMotionMode } from './useMotionMode';

/** A real interface settles into the page as the visitor reaches its chapter. */
export function ScrollFrame({ children, kind = 'project' }: { children: ReactNode; kind?: 'project' | 'roger' }) {
  const frame = useRef<HTMLDivElement>(null);
  const mode = useMotionMode();
  const mobile = mode === 'mobile-story' || mode === 'mobile-flow';
  const active = useInView(frame, { margin: '120px 0px' });
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'center center'] });
  const { scrollYProgress: readingProgress } = useScroll({ target: frame, offset: ['center center', 'end start'] });
  const direction = kind === 'roger' ? -1 : 1;
  const y = useTransform(() => mobile
    ? direction * (64 * (1 - scrollYProgress.get()) - 24 * readingProgress.get())
    : 48 * (1 - scrollYProgress.get()));
  const scale = useTransform(() => 1 - (mobile ? .14 : .06) * (1 - scrollYProgress.get()));
  const rotate = useTransform(() => (mobile ? direction * 2 : kind === 'roger' ? -3 : 1) * (1 - scrollYProgress.get()));
  return <div ref={frame} className="scroll-frame" data-scroll-motion={mode !== 'static'} data-motion-mode={mode}>
    <motion.div className="scroll-frame-surface" style={mode === 'static' ? undefined : {
      y, scale, rotate, willChange: active ? 'transform' : undefined,
    }}>
      {children}
    </motion.div>
  </div>;
}
