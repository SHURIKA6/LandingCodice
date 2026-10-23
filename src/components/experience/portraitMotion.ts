import { teamMembers } from '../../data/team.ts';

export type PortraitPanelMotion = {
  x: number;
  y: number;
  z: number;
  rotationY: number;
  rotationZ: number;
  scale: readonly [number, number, number];
};

export function clampPortraitProgress(progress: number): number {
  return Number.isNaN(progress) ? 0 : Math.min(1, Math.max(0, progress));
}

/** Reversible photographic stops for every team member, with no accumulated animation state. */
export function getPortraitMotion(progress: number): {
  activeIndex: number;
  camera: { x: number; y: number; z: number };
  panels: readonly PortraitPanelMotion[];
} {
  const normalized = clampPortraitProgress(progress);
  const cursor = normalized * (teamMembers.length - 1);
  const handoff = cursor % 1;
  const turn = 4 * handoff * (1 - handoff);

  return {
    activeIndex: Math.round(cursor),
    camera: {
      x: (normalized - 0.5) * 0.08,
      y: Math.sin(normalized * Math.PI) * 0.035,
      z: 5,
    },
    panels: teamMembers.map((_, index) => {
      const distance = index - cursor;
      const depth = Math.abs(distance);

      return {
        x: distance * 0.9,
        y: depth * 0.18,
        z: depth === 0 ? 0 : -depth * 1.35,
        // Parallel photographic surfaces cannot intersect during the depth swap.
        rotationY: turn * 0.12,
        rotationZ: turn * 0.045,
        scale: [1, 1, 1],
      };
    }),
  };
}

/** Cover a square using a centered crop; the source pixels keep their aspect. */
export function getSquareTextureCrop(width: number, height: number): {
  repeat: readonly [number, number];
  offset: readonly [number, number];
} {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return { repeat: [1, 1], offset: [0, 0] };
  }

  const edge = Math.min(width, height);
  const repeatX = edge / width;
  const repeatY = edge / height;

  return {
    repeat: [repeatX, repeatY],
    offset: [(1 - repeatX) / 2, (1 - repeatY) / 2],
  };
}
