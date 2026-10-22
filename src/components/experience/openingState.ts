/** Pure state for the opening: founder selector, progress ring and video policy. */

const validCount = (count: number) => Number.isInteger(count) && count > 0;

/** Keeps any index inside the list. Non-finite values fall back to the first person. */
function clampIndex(index: number, count: number): number {
  if (!validCount(count) || Number.isNaN(index)) return 0;
  return Math.min(count - 1, Math.max(0, Math.trunc(index)));
}

/** Moves the selection by `step` with wrap-around. Invalid input restarts from the first person. */
export function cycleIndex(current: number, step: number, count: number): number {
  if (!validCount(count)) return 0;
  const base = Number.isInteger(current) && current >= 0 && current < count ? current : 0;
  const delta = Number.isFinite(step) ? Math.trunc(step) : 0;
  return (((base + delta) % count) + count) % count;
}

/** "01 / 03": two digits for the active person and for the total. */
export function counterLabel(index: number, count: number): string {
  if (!validCount(count)) return '00 / 00';
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${pad(clampIndex(index, count) + 1)} / ${pad(count)}`;
}

/**
 * `stroke-dashoffset` for a ring drawn with `pathLength="1"`: one segment per person,
 * closed on the last one. 1 hides the arc, 0 shows it whole.
 */
export function ringOffset(index: number, count: number): number {
  if (!validCount(count)) return 0;
  return 1 - (clampIndex(index, count) + 1) / count;
}

/** What a screen reader hears when the selection changes. */
export function personLabel(person: { readonly name: string; readonly role: string }, index: number, count: number): string {
  return `${person.name}, ${person.role}, ${clampIndex(index, count) + 1} de ${count}`;
}

export type MediaSignals = {
  readonly reducedMotion: boolean;
  readonly saveData: boolean;
  /** `navigator.connection.effectiveType`, when the browser reports it. */
  readonly effectiveType?: string | null;
};

const slowConnections = new Set(['slow-2g', '2g', '3g']);

/** The looping video is an enhancement: it yields to reduced motion, data saving and slow links. */
export function shouldMountVideo({ reducedMotion, saveData, effectiveType }: MediaSignals): boolean {
  if (reducedMotion || saveData) return false;
  return !(effectiveType && slowConnections.has(effectiveType));
}
