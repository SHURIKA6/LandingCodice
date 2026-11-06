/**
 * One drawn arrow, pointed by direction (globals.css, "Arrow system"):
 * - external ↗: links that open a new tab (WhatsApp, GitHub, demonstrations);
 * - next →: same-page links and internal pages;
 * - down ↓: the in-page scroll link;
 * - up ↑: back to the start.
 * The direction is the CSS `rotate` property, so hover nudges (`translate`) compose with it.
 * Arrows belong to links only: never to eyebrows, headings, browser bars or the wordmark.
 */
export type ArrowDirection = 'external' | 'next' | 'down' | 'up';

export function Arrow({ direction = 'next' }: { direction?: ArrowDirection }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" className={`arrow arrow-${direction}`}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
