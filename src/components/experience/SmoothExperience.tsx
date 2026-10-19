'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import 'lenis/dist/lenis.css';

export function SmoothExperience({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | undefined;
    let frame = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = undefined;
      document.documentElement.dataset.scrollEngine = 'native';
    };
    const start = () => {
      stop();
      if (preference.matches || document.hidden) return;
      // Lenis already honors the target's CSS scroll-margin; don't add it twice.
      lenis = new Lenis({ lerp: 0.1, autoRaf: false, anchors: true, syncTouch: false });
      document.documentElement.dataset.scrollEngine = 'lenis';
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };
    const visibility = () => {
      if (document.hidden) stop();
      else start();
    };
    start();
    preference.addEventListener('change', start);
    document.addEventListener('visibilitychange', visibility);
    return () => { stop(); preference.removeEventListener('change', start); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
