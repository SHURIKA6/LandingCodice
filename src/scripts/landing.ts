import { setupRitmo } from './study';

/** Offer, navigation and case remain complete without this enhancement. */
export function setupLanding() {
  if ('IntersectionObserver' in window) setupRitmo();
}
