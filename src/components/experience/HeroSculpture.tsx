'use client';

import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { MotionMode } from './useMotionMode';
import './hero-sculpture.css';

/** The former decorative mark returns as a raster; it needs no extra canvas. */
export function HeroSculpture({ mode, scrollY, pointerX, pointerY }: {
  mode: MotionMode;
  scrollY: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  // A finite arc hands the opening to the portraits. It is entirely determined
  // by scroll, so returning to the opening recomposes the original object.
  const x = useTransform(scrollY, [0, 240, 580], [0, -12, -24]);
  const y = useTransform(scrollY, [0, 240, 580], [0, -8, -28]);
  const rotate = useTransform(scrollY, [0, 240, 580], [0, 18, -12]);
  const scale = useTransform(scrollY, [0, 240, 580], [1, 1.06, .94]);
  const pointerRotate = useTransform(pointerX, [-11, 11], [-5, 5]);
  return <div className="hero-sculpture" aria-hidden="true" data-motion-mode={mode}>
    <motion.div className="hero-sculpture-parallax" style={mode === 'static' ? undefined : { x, y, rotate, scale }}>
      <motion.div className="hero-sculpture-pointer" style={mode === 'desktop' ? { x: pointerX, y: pointerY, rotate: pointerRotate } : undefined}>
        <div className="hero-sculpture-entry">
          <img src="/brand/codice-sculpture-blue.webp" alt="" width="800" height="800" loading="eager" decoding="async" draggable="false" />
        </div>
      </motion.div>
    </motion.div>
  </div>;
}
