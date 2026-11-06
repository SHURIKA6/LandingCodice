import assert from 'node:assert/strict';
import test from 'node:test';
import { openingVisual } from '../src/components/experience/openingState.ts';

const photo = { src: '/team/equipe-web.webp', alt: 'Equipe da Codice', width: 1600, height: 1067, objectPosition: '50% 35%' };

test('without the team photo the opening keeps the sculpture', () => {
  assert.equal(openingVisual(null), null);
  assert.equal(openingVisual(undefined), null);
});

test('a same-origin photo with sizes, alt text and a crop fills the slot', () => {
  assert.equal(openingVisual(photo), photo);
});

test('a hotlinked or incomplete photo never replaces the sculpture', () => {
  for (const src of ['https://cdn.example/equipe.jpg', '//cdn.example/equipe.jpg', '/\\cdn.example/equipe.jpg', '/\t/cdn.example/equipe.jpg', 'team/equipe.jpg', '']) {
    assert.equal(openingVisual({ ...photo, src }), null, src);
  }
  for (const size of [0, -1, 1.5, NaN, Infinity]) {
    assert.equal(openingVisual({ ...photo, width: size }), null, `width ${size}`);
    assert.equal(openingVisual({ ...photo, height: size }), null, `height ${size}`);
  }
  assert.equal(openingVisual({ ...photo, alt: ' ' }), null);
  assert.equal(openingVisual({ ...photo, objectPosition: '' }), null);
});
