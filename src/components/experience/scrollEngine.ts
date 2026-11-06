import type Lenis from 'lenis';

let engine: Lenis | undefined;

/** SmoothExperience registers Lenis while it runs and clears it when it stops. */
export function registerScrollEngine(instance: Lenis | undefined) {
  engine = instance;
}

/**
 * Moves the page through the scroll engine that is running, so Lenis never animates back to an
 * older target. Without Lenis (reduced motion, hidden tab) the jump is instant.
 */
export function scrollPageTo(top: number, { immediate = false }: { immediate?: boolean } = {}) {
  if (engine) engine.scrollTo(top, { immediate, force: true });
  else window.scrollTo({ top, behavior: 'instant' });
}
