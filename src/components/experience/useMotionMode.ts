'use client';

import { useSyncExternalStore } from 'react';
import { useReducedPreference } from './useReducedPreference';

export type MotionMode = 'static' | 'mobile-story' | 'mobile-flow' | 'desktop';
const desktopQuery = '(min-width: 1024px)';
const storyQuery = '(max-width: 1023px) and (min-height: 560px) and (orientation: portrait)';
const subscribe = (listener: () => void) => {
  const media = [window.matchMedia(desktopQuery), window.matchMedia(storyQuery)];
  media.forEach(query => query.addEventListener('change', listener));
  return () => media.forEach(query => query.removeEventListener('change', listener));
};
const snapshot = (): MotionMode => window.matchMedia(desktopQuery).matches ? 'desktop'
  : window.matchMedia(storyQuery).matches ? 'mobile-story' : 'mobile-flow';
const serverSnapshot = (): MotionMode => 'static';

/** Responsive movement is independent of whether the optional renderer is ready. */
export function useMotionMode({ sceneFailed = false }: { sceneFailed?: boolean } = {}): MotionMode {
  const mode = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const reduce = useReducedPreference();
  return reduce || (mode === 'desktop' && sceneFailed) ? 'static' : mode;
}
