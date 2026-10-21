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

export type MobileStoryFrame = { activeIndex: 0 | 1 | 2; panels: readonly MobilePose[] };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => { const t = clamp(value, 0, 1); return t * t * (3 - 2 * t); };

/** Holds for reading, two reversible handoffs, no frame-dependent state. */
export function getMobileStoryFrame(progress: number): MobileStoryFrame {
  const p = Number.isNaN(progress) ? 0 : clamp(progress, 0, 1);
  const cursor = p <= .18 ? 0 : p < .38 ? smooth((p - .18) / .2)
    : p <= .62 ? 1 : p < .82 ? 1 + smooth((p - .62) / .2) : 2;
  return {
    activeIndex: (cursor < .5 ? 0 : cursor < 1.5 ? 1 : 2),
    panels: [0, 1, 2].map(index => {
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
