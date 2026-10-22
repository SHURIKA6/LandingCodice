import assert from 'node:assert/strict';
import test from 'node:test';
import {
  counterLabel, cycleIndex, personLabel, ringOffset, shouldMountVideo,
} from '../src/components/experience/openingState.ts';

test('the founder selector wraps in both directions and never leaves the list', () => {
  assert.equal(cycleIndex(0, 1, 3), 1);
  assert.equal(cycleIndex(1, 1, 3), 2);
  assert.equal(cycleIndex(2, 1, 3), 0);
  assert.equal(cycleIndex(0, -1, 3), 2);
  assert.equal(cycleIndex(2, -1, 3), 1);
  assert.equal(cycleIndex(1, 7, 3), 2);
  assert.equal(cycleIndex(1, -7, 3), 0);
});

test('an invalid selection or an empty list falls back to the first person', () => {
  for (const current of [NaN, -1, 3, 99, Infinity, -Infinity]) {
    const next = cycleIndex(current, 1, 3);
    assert.ok(Number.isInteger(next) && next >= 0 && next < 3, `index ${current} produced ${next}`);
  }
  assert.equal(cycleIndex(1, 1, 0), 0);
  assert.equal(cycleIndex(1, 1, NaN), 0);
  assert.equal(cycleIndex(0, NaN, 3), 0);
});

test('the counter always shows two digits for the active person and the total', () => {
  assert.equal(counterLabel(0, 3), '01 / 03');
  assert.equal(counterLabel(1, 3), '02 / 03');
  assert.equal(counterLabel(2, 3), '03 / 03');
  assert.equal(counterLabel(-4, 3), '01 / 03');
  assert.equal(counterLabel(9, 3), '03 / 03');
  assert.equal(counterLabel(0, 12), '01 / 12');
});

test('the progress ring fills one segment per person and ends closed on the last one', () => {
  const offsets = [0, 1, 2].map(index => ringOffset(index, 3));
  assert.ok(Math.abs(offsets[0] - 2 / 3) < 1e-9);
  assert.ok(Math.abs(offsets[1] - 1 / 3) < 1e-9);
  assert.equal(offsets[2], 0);
  assert.ok(offsets[0] > offsets[1] && offsets[1] > offsets[2]);
  for (const bad of [NaN, -3, 8, Infinity]) {
    const value = ringOffset(bad, 3);
    assert.ok(Number.isFinite(value) && value >= 0 && value <= 1, `offset for ${bad} was ${value}`);
  }
  assert.equal(ringOffset(0, 0), 0);
});

test('the spoken label names the person, the role and the position', () => {
  const person = { name: 'Eduardo Gobatto', role: 'Arquitetura & Sistemas' };
  assert.equal(personLabel(person, 1, 3), 'Eduardo Gobatto, Arquitetura & Sistemas, 2 de 3');
  assert.equal(personLabel(person, 99, 3), 'Eduardo Gobatto, Arquitetura & Sistemas, 3 de 3');
});

test('the background video is skipped whenever motion or data should be spared', () => {
  const ok = { reducedMotion: false, saveData: false, effectiveType: '4g' };
  assert.equal(shouldMountVideo(ok), true);
  assert.equal(shouldMountVideo({ ...ok, effectiveType: undefined }), true);
  assert.equal(shouldMountVideo({ ...ok, effectiveType: null }), true);
  assert.equal(shouldMountVideo({ ...ok, effectiveType: 'unexpected' }), true);
  assert.equal(shouldMountVideo({ ...ok, reducedMotion: true }), false);
  assert.equal(shouldMountVideo({ ...ok, saveData: true }), false);
  for (const slow of ['slow-2g', '2g', '3g']) assert.equal(shouldMountVideo({ ...ok, effectiveType: slow }), false, slow);
  assert.equal(shouldMountVideo({ reducedMotion: true, saveData: true, effectiveType: '2g' }), false);
});
