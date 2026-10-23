'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import { shouldCancelWhenHidden } from './motionVisibility';
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
      document.documentElement.toggleAttribute('data-motion-paused', document.hidden);
      if (document.hidden) {
        stop();
        // CSS entrances and transitions also need a real cancellation path.
        // Their authored end states remain visible after the effect is removed.
        // Scroll-driven animations are left attached; cancelling them would leave
        // the section stuck at the last rendered position.
        document.getAnimations().forEach(animation => {
          if (shouldCancelWhenHidden(animation, document.timeline)) animation.cancel();
        });
      }
      else start();
    };
    start();
    document.documentElement.toggleAttribute('data-motion-paused', document.hidden);
    preference.addEventListener('change', start);
    document.addEventListener('visibilitychange', visibility);
    return () => { stop(); preference.removeEventListener('change', start); document.removeEventListener('visibilitychange', visibility); document.documentElement.removeAttribute('data-motion-paused'); };
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
