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
      x: (normalized - 0.5) * 0.16 + Math.sin(handoff * Math.PI * 2) * 0.1,
      y: Math.sin(normalized * Math.PI) * 0.07,
      z: 4.9 + turn * 0.3 + Math.sin(normalized * Math.PI) * 0.1,
    },
    panels: teamMembers.map((_, index) => {
      const distance = index - cursor;
      const depth = Math.abs(distance);

      return {
        x: distance * 1.04,
        y: depth === 0 ? 0 : -Math.sign(distance) * Math.min(depth, 1) * 0.32,
        z: depth === 0 ? 0 : -depth * 2.2,
        // Parallel photographic surfaces cannot intersect during the depth swap.
        rotationY: turn * 0.32,
        rotationZ: turn * 0.065,
        scale: [1, 1, 1],
      };
    }),
  };
}

/** Pixel travel is depth-weighted and bounded, even during a rapid pointer exit. */
export function getPortraitPointerTravel(depth: number): number {
  const safeDepth = Number.isFinite(depth) ? Math.max(0, depth) : 0;
  return 8 + 18 / (1 + safeDepth * 1.5);
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
