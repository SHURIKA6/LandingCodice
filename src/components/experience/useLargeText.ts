'use client';

import { useSyncExternalStore } from 'react';

// Hero.tsx measures enlarged text once (`.person-kicker`) and marks <html data-large-text>;
// other stages read that one signal instead of measuring again.
const subscribe = (change: () => void) => {
  const observer = new MutationObserver(change);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-large-text'] });
  return () => observer.disconnect();
};
const snapshot = () => document.documentElement.hasAttribute('data-large-text');
const serverSnapshot = () => false;

/** True while the visitor's text is enlarged: pinned stages then fall back to the reading flow. */
export function useLargeText() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
