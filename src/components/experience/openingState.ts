/** Pure state for the opening's visual slot. */
import type { OpeningPhoto } from '../../data/opening';

const positive = (value: number) => Number.isInteger(value) && value > 0;
const probe = 'https://codice.invalid';

/** A root-relative path that the URL parser keeps on this origin ('/\host' and '//host' leave it). */
function isSameOriginPath(src: string): boolean {
  if (!src.startsWith('/')) return false;
  try { return new URL(src, probe).origin === probe; } catch { return false; }
}

/**
 * The team photo fills the slot only when it is a same-origin file with real dimensions, an alt text
 * and a crop. Anything else (null, a hotlinked URL, missing sizes) keeps the sculpture, so the opening
 * never loads from another origin and never shows an empty frame.
 */
export function openingVisual(photo: OpeningPhoto | null | undefined): OpeningPhoto | null {
  if (!photo) return null;
  const described = photo.alt.trim() !== '' && photo.objectPosition.trim() !== '';
  return isSameOriginPath(photo.src) && described && positive(photo.width) && positive(photo.height) ? photo : null;
}
