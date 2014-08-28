'use strict';

/**
 * Benchmark related modules.
 */
var benchmark = require('benchmark');

/**
 * Logger.
 */
var logger = new(require('devnull'))({ timestamp: false, namespacing: 0 });

/**
 * Preparation code.
 */
var EventEmitter2 = require('eventemitter2').EventEmitter2
  , EventEmitter3 = require('eventemitter3').EventEmitter
  , EventEmitter1 = require('events').EventEmitter
  , Master = require('../../').EventEmitter
  , Drip = require('drip').EventEmitter
  , EE = require('event-emitter');

function handle() {
  if (arguments.length > 100) console.log('damn');
}

/**
 * Instances.
 */
var ee2 = new EventEmitter2()
  , ee3 = new EventEmitter3()
  , ee1 = new EventEmitter1()
  , master = new Master()
  , drip = new Drip()
  , ee = EE({});

[ee, ee3, ee2, ee1, drip, master].forEach(function ohai(emitter) {
  emitter.on('foo', handle);

  //
  // We add and remove a listener to see if the event emitter implementation is
  // de-optimized because it deletes items from an object etc.
  //
  emitter.on('ohai', ohai);
  if (emitter.removeListener) emitter.removeListener('ohai', ohai);
  else if(emitter.off) emitter.off('ohai', ohai);
  else throw new Error('No proper remove implementation');
});

(
  new benchmark.Suite()
).add('EventEmitter 1', function test1() {
  ee1.emit('foo');
  ee1.emit('foo', 'bar');
  ee1.emit('foo', 'bar', 'baz');
  ee1.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter 2', function test2() {
  ee2.emit('foo');
  ee2.emit('foo', 'bar');
  ee2.emit('foo', 'bar', 'baz');
  ee2.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter 3', function test2() {
  ee3.emit('foo');
  ee3.emit('foo', 'bar');
  ee3.emit('foo', 'bar', 'baz');
  ee3.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter 3 (master)', function test2() {
  master.emit('foo');
  master.emit('foo', 'bar');
  master.emit('foo', 'bar', 'baz');
  master.emit('foo', 'bar', 'baz', 'boom');
}).add('Drip', function test2() {
  drip.emit('foo');
  drip.emit('foo', 'bar');
  drip.emit('foo', 'bar', 'baz');
  drip.emit('foo', 'bar', 'baz', 'boom');
}).add('event-emitter', function test2() {
  ee.emit('foo');
  ee.emit('foo', 'bar');
  ee.emit('foo', 'bar', 'baz');
  ee.emit('foo', 'bar', 'baz', 'boom');
}).on('cycle', function cycle(e) {
  var details = e.target;

  logger.log('Finished benchmarking: "%s"', details.name);
  logger.metric('Count (%d), Cycles (%d), Elapsed (%d), Hz (%d)'
    , details.count
    , details.cycles
    , details.times.elapsed
    , details.hz
  );
}).on('complete', function completed() {
  logger.info('Benchmark: "%s" is the fastest.'
    , this.filter('fastest').pluck('name')
  );
}).run();
