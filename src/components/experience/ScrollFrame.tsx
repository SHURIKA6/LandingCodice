'use client';

import { Children, cloneElement, isValidElement, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { MotionStyle } from 'framer-motion';
import { useMotionMode } from './useMotionMode';
import './project-motion.css';

/** A real interface settles into the page as the visitor reaches its chapter. */
export function ScrollFrame({ children, kind = 'project' }: { children: ReactNode; kind?: 'project' | 'roger' }) {
  const frame = useRef<HTMLDivElement>(null);
  const mode = useMotionMode();
  const mobile = mode === 'mobile-story' || mode === 'mobile-flow';
  const active = useInView(frame, { margin: '120px 0px' });
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'center center'] });
  const { scrollYProgress: readingProgress } = useScroll({ target: frame, offset: ['center center', 'end start'] });
  const direction = kind === 'roger' ? -1 : 1;
  const x = useTransform(() => direction * (mobile ? 14 : 30) * (1 - scrollYProgress.get()));
  const y = useTransform(() => (mobile ? direction * 78 : 84) * (1 - scrollYProgress.get()) - (mobile ? 20 : 28) * readingProgress.get());
  const scale = useTransform(() => 1 - (mobile ? .18 : .14) * (1 - scrollYProgress.get()));
  const rotate = useTransform(() => direction * (mobile ? 4 : 4.5) * (1 - scrollYProgress.get()));
  // A 10% uniform overscan gives the screenshot a safe 9% reading journey.
  // Both Corretor layers inherit the same position, including a late decode.
  const panY = useTransform(() => `${-4.5 * (scrollYProgress.get() + readingProgress.get())}%`);
  const media = kind === 'roger' && isValidElement<{ children: ReactNode }>(children)
    ? cloneElement(children, undefined, Children.map(children.props.children, child =>
      isValidElement(child) && child.type === 'img'
        ? <div className="project-media-crop"><div className="project-media-pan">{child}</div></div>
        : child))
    : children;
  return <div ref={frame} className="scroll-frame" data-scroll-motion={mode !== 'static'} data-motion-mode={mode} data-frame-visible={active}>
    <motion.div className="scroll-frame-surface" style={mode === 'static' ? undefined : {
      x, y, scale, rotate, '--project-pan-y': panY, willChange: active ? 'transform' : undefined,
    } as MotionStyle}>
      {media}
    </motion.div>
  </div>;
}
