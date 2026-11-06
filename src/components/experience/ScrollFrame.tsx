'use client';

import { Children, cloneElement, isValidElement, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { MotionStyle } from 'framer-motion';
import { useMotionMode } from './useMotionMode';
import { usePointerMotion } from './usePointerMotion';
import './project-motion.css';

/** A real interface settles into the page as the visitor reaches its chapter. */
export function ScrollFrame({ children, kind = 'project' }: { children: ReactNode; kind?: 'project' | 'roger' }) {
  const frame = useRef<HTMLDivElement>(null);
  const mode = useMotionMode();
  const pointer = usePointerMotion(frame, mode === 'desktop');
  const tiltX = useTransform(pointer.y, [-1, 1], [2.5, -2.5]);
  const tiltY = useTransform(pointer.x, [-1, 1], [-2.5, 2.5]);
  const mobile = mode === 'mobile-story' || mode === 'mobile-flow';
  const active = useInView(frame, { margin: '120px 0px' });
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'center center'] });
  const { scrollYProgress: readingProgress } = useScroll({ target: frame, offset: ['center center', 'end start'] });
  const direction = kind === 'roger' ? -1 : 1;
  const x = useTransform(() => direction * (mobile ? 14 : 30) * (1 - scrollYProgress.get()));
  const y = useTransform(() => (mobile ? direction * 78 : 84) * (1 - scrollYProgress.get()) - (mobile ? 20 : 28) * readingProgress.get());
  const scale = useTransform(() => 1 - (mobile ? .18 : .14) * (1 - scrollYProgress.get()));
  const rotate = useTransform(() => direction * (mobile ? 4 : 4.5) * (1 - scrollYProgress.get()));
  // The reading journey runs while the frame travels and resolves to the exact capture, unscaled and
  // unpanned, when the frame settles at the centre: the pan moves the pixels from +A% (entering) to
  // −A% (leaving) and the overscan, about the centre, always covers it (scale ≥ 1 + 2|pan|).
  // Both Corretor layers inherit the same position, including a late decode.
  const amplitude = kind === 'project' ? 6.5 : 4.5;
  const panY = useTransform(() => `${amplitude * ((1 - scrollYProgress.get()) - readingProgress.get())}%`);
  const panScale = useTransform(() => 1 + amplitude / 50 * Math.max(1 - scrollYProgress.get(), readingProgress.get()));
  const barY = useTransform(scrollYProgress, [0, .12, 1], [12, 12, 0]);
  const media = kind === 'roger' && isValidElement<{ children: ReactNode }>(children)
    ? cloneElement(children, undefined, Children.map(children.props.children, child =>
      isValidElement(child) && child.type === 'img'
        ? <div className="project-media-crop"><div className="project-media-pan">{child}</div></div>
        : child))
    : children;
  return <div ref={frame} className="scroll-frame" data-kind={kind} data-scroll-motion={mode !== 'static'} data-motion-mode={mode} data-frame-visible={active}>
    <motion.div className="scroll-frame-tilt" style={mode !== 'desktop' ? undefined : { rotateX: tiltX, rotateY: tiltY }}>
    <motion.div className="scroll-frame-surface" style={mode === 'static' ? undefined : {
      x, y, scale, rotate, '--project-pan-y': panY, '--project-pan-scale': panScale, '--browser-bar-y': barY, willChange: active ? 'transform' : undefined,
    } as MotionStyle}>
      {media}
    </motion.div>
    </motion.div>
  </div>;
}
