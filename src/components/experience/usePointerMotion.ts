'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

/** Normalized mouse travel; touch, focus and hidden/offscreen surfaces stay at rest. */
export function usePointerMotion(target: RefObject<HTMLElement | null>, enabled: boolean) {
  const horizontal = useMotionValue(0);
  const vertical = useMotionValue(0);
  const x = useSpring(horizontal, { stiffness: 100, damping: 26, restDelta: .001 });
  const y = useSpring(vertical, { stiffness: 100, damping: 26, restDelta: .001 });
  const inView = useInView(target);

  useEffect(() => {
    const element = target.current;
    const reset = () => { horizontal.set(0); vertical.set(0); x.jump(0); y.jump(0); };
    if (!element || !enabled || !inView) { reset(); return; }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || document.hidden
        || document.documentElement.hasAttribute('data-large-text') || element.contains(document.activeElement)) return;
      const bounds = element.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      horizontal.set(Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1)));
      vertical.set(Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1)));
    };
    const leave = () => { horizontal.set(0); vertical.set(0); };
    const visibility = () => { if (document.hidden) reset(); };
    const textObserver = new MutationObserver(reset);
    textObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-large-text'] });
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', leave);
    element.addEventListener('focusin', reset);
    element.addEventListener('pointerdown', reset, { passive: true });
    window.addEventListener('blur', reset);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      textObserver.disconnect();
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', leave);
      element.removeEventListener('focusin', reset);
      element.removeEventListener('pointerdown', reset);
      window.removeEventListener('blur', reset);
      document.removeEventListener('visibilitychange', visibility);
      reset();
    };
  }, [target, enabled, inView, horizontal, vertical, x, y]);

  return { x, y };
}
