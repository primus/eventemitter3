import EventEmitterDefault, { EventEmitter } from '../index.mjs';

it('exports `EventEmitter` as default export', () => {
  new EventEmitterDefault();
})

it('exports `EventEmitter` as a named export', () => {
  new EventEmitter();
})
