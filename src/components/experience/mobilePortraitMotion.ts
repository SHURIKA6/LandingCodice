import { teamMembers } from '../../data/team.ts';

export type MobilePose = {
  xPercent: number;
  yPercent: number;
  scale: number;
  rotation: number;
  opacity: number;
  nameYPercent: number;
  nameOpacity: number;
  zIndex: number;
};

export type MobileStoryFrame = { activeIndex: number; panels: readonly MobilePose[] };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => { const t = clamp(value, 0, 1); return t * t * (3 - 2 * t); };

/** Segment layout: one readable hold per person, one reversible handoff between each pair. */
const HANDOFF_LENGTH = 0.18;

function holdLength(): number {
  return (1 - (teamMembers.length - 1) * HANDOFF_LENGTH) / teamMembers.length;
}

function cursorAt(progress: number): number {
  const hold = holdLength();
  const people = teamMembers.length;
  for (let index = 0; index < people - 1; index += 1) {
    const holdEnd = index * (hold + HANDOFF_LENGTH) + hold;
    if (progress <= holdEnd) return index;
    const handoffEnd = holdEnd + HANDOFF_LENGTH;
    if (progress < handoffEnd) return index + smooth((progress - holdEnd) / HANDOFF_LENGTH);
  }
  return people - 1;
}

/** Holds for reading, reversible handoffs, no frame-dependent state. */
export function getMobileStoryFrame(progress: number): MobileStoryFrame {
  const p = Number.isNaN(progress) ? 0 : clamp(progress, 0, 1);
  const cursor = cursorAt(p);
  const people = teamMembers.length;
  return {
    activeIndex: Math.round(cursor),
    panels: Array.from({ length: people }, (_, index) => {
      const distance = index - cursor;
      const depth = Math.abs(distance);
      return {
        xPercent: clamp(distance * 38, -38, 38),
        yPercent: Math.min(depth * 12, 12),
        scale: Math.max(.82, 1 - depth * .18),
        rotation: clamp(distance * 6, -6, 6),
        opacity: clamp(1 - depth, 0, 1),
        nameYPercent: distance === 0 ? 0 : -distance * 110,
        nameOpacity: clamp(1 - depth, 0, 1),
        zIndex: Math.round(200 - depth * 100),
      };
    }),
  };
}

/** Progress values that sit inside each readable hold: one stop per person. */
export function mobileStoryStops(): readonly number[] {
  const hold = holdLength();
  const people = teamMembers.length;
  return Array.from({ length: people }, (_, index) => index * (hold + HANDOFF_LENGTH) + hold / 2);
}

/** Hold ends and handoff ends: where pose continuity between segments matters most. */
export function mobileStoryBoundaries(): readonly number[] {
  const hold = holdLength();
  return Array.from({ length: teamMembers.length - 1 }, (_, index) => {
    const holdEnd = index * (hold + HANDOFF_LENGTH) + hold;
    return [holdEnd, holdEnd + HANDOFF_LENGTH];
  }).flat();
}
