import assert from 'node:assert/strict';
import test from 'node:test';
import { getMobileStoryFrame } from '../src/components/experience/mobilePortraitMotion.ts';

test('mobile story has three readable photographic stops', () => {
  for (const [progress, index] of [[.08, 0], [.5, 1], [.92, 2]]) {
    const frame = getMobileStoryFrame(progress);
    assert.equal(frame.activeIndex, index);
    assert.equal(frame.panels.length, 3);
    const pose = frame.panels[index];
    assert.equal(pose.xPercent, 0);
    assert.equal(pose.yPercent, 0);
    assert.equal(pose.scale, 1);
    assert.equal(pose.rotation, 0);
    assert.equal(pose.opacity, 1);
    assert.equal(pose.nameOpacity, 1);
    assert.equal(pose.nameYPercent, 0);
  }
});

test('invalid and overscrolled progress keep a valid person visible', () => {
  for (const [progress, index] of [[-.3, 0], [NaN, 0], [-Infinity, 0], [1.4, 2], [Infinity, 2]]) {
    const frame = getMobileStoryFrame(progress);
    assert.equal(frame.activeIndex, index);
    assert.equal(frame.panels[index].opacity, 1);
    assert.ok(frame.panels.flatMap(Object.values).every(Number.isFinite));
  }
});

test('handoffs never blank the stage or distort photograph proportions', () => {
  for (let step = 0; step <= 1000; step++) {
    const { panels } = getMobileStoryFrame(step / 1000);
    assert.ok(Math.max(...panels.map(pose => pose.opacity)) >= .5 - 1e-10);
    for (const pose of panels) {
      assert.ok(pose.scale >= .82 && pose.scale <= 1.04);
      assert.ok(Math.abs(pose.xPercent) <= 38 && Math.abs(pose.yPercent) <= 12);
      assert.ok(Math.abs(pose.rotation) <= 6);
      assert.ok(pose.opacity >= 0 && pose.opacity <= 1);
      assert.ok(pose.nameOpacity >= 0 && pose.nameOpacity <= 1);
    }
  }
});

test('poses stay continuous at all reading and handoff boundaries', () => {
  for (const progress of [.18, .28, .38, .62, .72, .82]) {
    const before = getMobileStoryFrame(progress - .000001);
    const after = getMobileStoryFrame(progress + .000001);
    for (let index = 0; index < 3; index++) {
      for (const key of ['xPercent', 'yPercent', 'scale', 'rotation', 'opacity', 'nameYPercent', 'nameOpacity']) {
        assert.ok(Math.abs(before.panels[index][key] - after.panels[index][key]) < .01, `${key} jumps at ${progress}`);
      }
    }
  }
});

test('scroll reversal restores the scene rather than accumulating offsets', () => {
  const original = getMobileStoryFrame(.31);
  getMobileStoryFrame(.95);
  getMobileStoryFrame(.02);
  assert.deepEqual(getMobileStoryFrame(.31), original);
  assert.equal(getMobileStoryFrame(.27).activeIndex, 0);
  assert.equal(getMobileStoryFrame(.29).activeIndex, 1);
  assert.equal(getMobileStoryFrame(.71).activeIndex, 1);
  assert.equal(getMobileStoryFrame(.73).activeIndex, 2);
});
