import assert from 'node:assert/strict';
import test from 'node:test';
import { teamMembers } from '../src/data/team.ts';
import {
  clampPortraitProgress,
  getPortraitMotion,
  getSquareTextureCrop,
} from '../src/components/experience/portraitMotion.ts';

const count = teamMembers.length;
const stops = Array.from({ length: count }, (_, index) => index / (count - 1));

test('invalid or overscrolled progress still selects an existing portrait', () => {
  for (const [input, expected] of [
    [-0.2, 0],
    [0, 0],
    [0.37, 0.37],
    [1, 1],
    [1.4, 1],
    [Number.NaN, 0],
    [Number.NEGATIVE_INFINITY, 0],
    [Number.POSITIVE_INFINITY, 1],
  ]) {
    assert.equal(clampPortraitProgress(input), expected);
  }
});

test('each readable stop brings its own photo to the front and center', () => {
  for (const [progress, expectedIndex] of stops.map((progress, index) => [progress, index])) {
    const scene = getPortraitMotion(progress);
    assert.equal(scene.panels.length, count);
    assert.equal(scene.activeIndex, expectedIndex);
    const focused = scene.panels[expectedIndex];
    assert.equal(focused.x, 0);
    assert.equal(focused.y, 0);
    assert.equal(focused.z, 0);
    assert.equal(focused.rotationY, 0);
    assert.equal(focused.rotationZ, 0);
    assert.ok(scene.panels.every((panel, index) => index === expectedIndex || panel.z < focused.z));
  }
});

test('the active photograph is the closest to the camera at every scroll position', () => {
  for (let step = 0; step <= 100; step += 1) {
    const scene = getPortraitMotion(step / 100);
    const active = scene.panels[scene.activeIndex];
    assert.ok(scene.panels.every(panel => panel.z <= active.z), `an inactive photo overtook the active one at ${step}`);
  }
});

test('scrolling back restores the same scene and switches names at the nearest stop', () => {
  const original = getPortraitMotion(0.32);
  getPortraitMotion(0.9);
  getPortraitMotion(0.04);
  assert.deepEqual(getPortraitMotion(0.32), original);
  for (let index = 0; index < count - 1; index += 1) {
    const switchProgress = (index + 0.5) / (count - 1);
    assert.equal(getPortraitMotion(switchProgress - 0.001).activeIndex, index);
    assert.equal(getPortraitMotion(switchProgress + 0.001).activeIndex, index + 1);
  }
});

test('handoffs move through depth continuously without stretching their square planes', () => {
  for (let index = 0; index < count - 1; index += 1) {
    const before = getPortraitMotion(stops[index]);
    const after = getPortraitMotion(stops[index + 1]);
    assert.ok(after.panels[index].z < before.panels[index].z, 'the outgoing photo recedes in depth');
    assert.ok(after.panels[index + 1].z > before.panels[index + 1].z, 'the incoming photo advances in depth');
  }

  for (let step = 0; step <= 100; step += 1) {
    const scene = getPortraitMotion(step / 100);
    const next = getPortraitMotion((step + 0.01) / 100);
    for (const [index, panel] of scene.panels.entries()) {
      assert.ok(Object.values(panel).flat().every(Number.isFinite));
      assert.equal(panel.scale[0], panel.scale[1], 'a photo must retain its square plane');
      assert.ok(panel.scale[0] > 0);
      assert.ok(panel.z <= 0, 'a panel must never cross the camera');
      assert.ok(Math.abs(panel.x - next.panels[index].x) < 0.01);
      assert.ok(Math.abs(panel.z - next.panels[index].z) < 0.01);
    }
  }
});

test('handoff surfaces stay parallel so neighboring photographs cannot slice through one another', () => {
  const samples = [];
  for (let step = 0; step <= 20; step += 1) samples.push(step / 20);
  for (const progress of samples) {
    const { panels } = getPortraitMotion(progress);
    // For the scene's XYZ Euler rotation with x=0, local +Z becomes this normal.
    const reference = [Math.sin(panels[0].rotationY), 0, Math.cos(panels[0].rotationY)];
    for (const panel of panels) {
      const normal = [Math.sin(panel.rotationY), 0, Math.cos(panel.rotationY)];
      const alignment = normal[0] * reference[0] + normal[2] * reference[2];
      assert.ok(alignment > 1 - 1e-12, `photographic planes must be parallel at progress ${progress}`);
      assert.equal(panel.rotationZ, panels[0].rotationZ, 'square edges should share the same turn');
    }
  }

  for (const progress of stops) {
    for (const panel of getPortraitMotion(progress).panels) {
      assert.equal(panel.rotationY, 0);
      assert.equal(panel.rotationZ, 0);
    }
  }
});

test('square crops preserve image proportions instead of squeezing a face into a square', () => {
  assert.deepEqual(getSquareTextureCrop(800, 800), { repeat: [1, 1], offset: [0, 0] });
  const portrait = getSquareTextureCrop(600, 900);
  const landscape = getSquareTextureCrop(900, 600);
  assert.deepEqual(portrait.repeat, [1, 2 / 3]);
  assert.deepEqual(landscape.repeat, [2 / 3, 1]);
  assert.ok(Math.abs(portrait.offset[1] - 1 / 6) < 1e-12);
  assert.ok(Math.abs(landscape.offset[0] - 1 / 6) < 1e-12);
  assert.equal(portrait.repeat[0] * 600, portrait.repeat[1] * 900);
  assert.equal(landscape.repeat[0] * 900, landscape.repeat[1] * 600);
  assert.deepEqual(getSquareTextureCrop(0, Number.NaN), { repeat: [1, 1], offset: [0, 0] });
});
