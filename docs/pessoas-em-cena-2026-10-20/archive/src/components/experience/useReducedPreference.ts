'use client';

import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
const subscribe = (change: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', change);
  return () => media.removeEventListener('change', change);
};
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => true;

/** Framer's current hook snapshots the preference; this also handles live changes. */
export function useReducedPreference() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
