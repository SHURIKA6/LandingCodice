'use client';

import { useEffect } from 'react';
import { useMotionValue, useScroll, useSpring } from 'framer-motion';
import { HeroSculpture } from './HeroSculpture';
import { useMotionMode } from './useMotionMode';

/**
 * The blue sculpture keeps the motion it had in the previous opening: a finite arc driven by the
 * page scroll and, with a mouse on desktop, a sprung pointer parallax. Pointer state resets
 * whenever the opening is not the thing being watched.
 */
export function OpeningSculpture() {
  const mode = useMotionMode();
  const { scrollY } = useScroll();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 90, damping: 24, restDelta: .05 });
  const y = useSpring(pointerY, { stiffness: 90, damping: 24, restDelta: .05 });

  useEffect(() => {
    const host = document.getElementById('inicio');
    const reset = () => { pointerX.set(0); pointerY.set(0); x.jump(0); y.jump(0); };
    if (!host || mode !== 'desktop') { reset(); return; }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = host.getBoundingClientRect();
      pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 22);
      pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 14);
    };
    const leave = () => { pointerX.set(0); pointerY.set(0); };
    const visibility = () => { if (document.hidden) reset(); };
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('blur', reset);
    return () => {
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('blur', reset);
      reset();
    };
  }, [mode, pointerX, pointerY, x, y]);

  return <HeroSculpture mode={mode} scrollY={scrollY} pointerX={x} pointerY={y} />;
}
