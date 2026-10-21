'use client';

import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { MotionMode } from './useMotionMode';
import './hero-sculpture.css';

/** The former decorative mark returns as a raster; it needs no extra canvas. */
export function HeroSculpture({ mode, scrollY }: { mode: MotionMode; scrollY: MotionValue<number> }) {
  const y = useTransform(scrollY, [0, 500], [0, -24]);
  return <div className="hero-sculpture" aria-hidden="true">
    <motion.div className="hero-sculpture-parallax" style={mode === 'static' ? undefined : { y }}>
      <div className="hero-sculpture-entry">
        <img src="/brand/codice-sculpture-blue.webp" alt="" width="800" height="800" loading="eager" decoding="async" draggable="false" />
      </div>
    </motion.div>
  </div>;
}
