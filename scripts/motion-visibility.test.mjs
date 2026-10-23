import assert from 'node:assert/strict';
import test from 'node:test';
import { shouldCancelWhenHidden } from '../src/components/experience/motionVisibility.ts';

const documentTimeline = { kind: 'document' };
const viewTimeline = { kind: 'view' };
const finiteEffect = { getTiming: () => ({ iterations: 1 }) };
const infiniteEffect = { getTiming: () => ({ iterations: Infinity }) };

test('finite document-timeline animations (CSS entrances) are cancelled when hidden', () => {
  assert.equal(shouldCancelWhenHidden({ timeline: documentTimeline, effect: finiteEffect }, documentTimeline), true);
});

test('scroll-driven animations survive a tab switch even when they are finite', () => {
  assert.equal(shouldCancelWhenHidden({ timeline: viewTimeline, effect: finiteEffect }, documentTimeline), false);
  assert.equal(shouldCancelWhenHidden({ timeline: viewTimeline, effect: infiniteEffect }, documentTimeline), false);
});

test('infinite document-timeline animations keep running', () => {
  assert.equal(shouldCancelWhenHidden({ timeline: documentTimeline, effect: infiniteEffect }, documentTimeline), false);
});

test('an animation without an effect is still cancelled, as before', () => {
  assert.equal(shouldCancelWhenHidden({ timeline: documentTimeline, effect: null }, documentTimeline), true);
});
