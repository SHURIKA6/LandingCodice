import assert from 'node:assert/strict';
import test from 'node:test';
import { teamMembers } from '../src/data/team.ts';
import { getMobileStoryFrame, mobileStoryBoundaries, mobileStoryStops } from '../src/components/experience/mobilePortraitMotion.ts';

const count = teamMembers.length;
const stops = mobileStoryStops();
const poseKeys = ['xPercent', 'yPercent', 'scale', 'rotation', 'opacity', 'nameYPercent', 'nameOpacity'];

test('the mobile story has one readable photographic stop per person', () => {
  assert.equal(stops.length, count);
  for (const [progress, index] of stops.map((progress, index) => [progress, index])) {
    const frame = getMobileStoryFrame(progress);
    assert.equal(frame.activeIndex, index);
    assert.equal(frame.panels.length, count);
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
  for (const progress of [-.3, NaN, -Infinity]) {
    const frame = getMobileStoryFrame(progress);
    assert.equal(frame.activeIndex, 0);
    assert.equal(frame.panels[0].opacity, 1);
    assert.ok(frame.panels.flatMap(Object.values).every(Number.isFinite));
  }
  for (const progress of [1.4, Infinity]) {
    const frame = getMobileStoryFrame(progress);
    assert.equal(frame.activeIndex, count - 1);
    assert.equal(frame.panels[count - 1].opacity, 1);
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

test('poses stay continuous at every reading and handoff boundary', () => {
  for (const boundary of mobileStoryBoundaries()) {
    const before = getMobileStoryFrame(boundary - 1e-6);
    const after = getMobileStoryFrame(boundary + 1e-6);
    for (let index = 0; index < count; index++) {
      for (const key of poseKeys) {
        assert.ok(Math.abs(before.panels[index][key] - after.panels[index][key]) < .01,
          `${key} jumps at ${boundary}`);
      }
    }
  }
  const reached = new Set();
  for (let step = 0; step <= 1200; step++) reached.add(getMobileStoryFrame(step / 1200).activeIndex);
  assert.deepEqual([...reached].sort((a, b) => a - b), Array.from({ length: count }, (_, index) => index));
});

test('the selection advances person by person and reverses cleanly', () => {
  const original = getMobileStoryFrame(stops[Math.min(1, stops.length - 1)]);
  getMobileStoryFrame(.99);
  getMobileStoryFrame(.02);
  assert.deepEqual(getMobileStoryFrame(stops[Math.min(1, stops.length - 1)]), original);
  for (let progress = 0; progress < 1; progress += 1e-4) {
    const previous = getMobileStoryFrame(progress);
    const current = getMobileStoryFrame(progress + 5e-4);
    assert.ok(current.activeIndex >= previous.activeIndex && current.activeIndex <= previous.activeIndex + 1,
      `active index jumped at ${progress}`);
  }
});
