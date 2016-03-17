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
  , EventEmitter3 = require('eventemitter3')
  , EventEmitter1 = require('events').EventEmitter
  , Master = require('../../')
  , Drip = require('drip').EventEmitter
  , EE = require('event-emitter')
  , FE = require('fastemitter')
  , CE = require('contra/emitter');

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
  , fe = new FE()
  , ee = EE({})
  , ce = CE();

ee.on('foo', handle);
fe.on('foo', handle);
ee3.on('foo', handle);
ee2.on('foo', handle);
ee1.on('foo', handle);
drip.on('foo', handle);
master.on('foo', handle);
ce.on('foo', handle);

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  ee1.emit('foo');
  ee1.emit('foo', 'bar');
  ee1.emit('foo', 'bar', 'baz');
  ee1.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter2', function() {
  ee2.emit('foo');
  ee2.emit('foo', 'bar');
  ee2.emit('foo', 'bar', 'baz');
  ee2.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter3@0.1.6', function() {
  ee3.emit('foo');
  ee3.emit('foo', 'bar');
  ee3.emit('foo', 'bar', 'baz');
  ee3.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter3(master)', function() {
  master.emit('foo');
  master.emit('foo', 'bar');
  master.emit('foo', 'bar', 'baz');
  master.emit('foo', 'bar', 'baz', 'boom');
}).add('Drip', function() {
  drip.emit('foo');
  drip.emit('foo', 'bar');
  drip.emit('foo', 'bar', 'baz');
  drip.emit('foo', 'bar', 'baz', 'boom');
}).add('fastemitter', function() {
  fe.emit('foo');
  fe.emit('foo', 'bar');
  fe.emit('foo', 'bar', 'baz');
  fe.emit('foo', 'bar', 'baz', 'boom');
}).add('event-emitter', function() {
  ee.emit('foo');
  ee.emit('foo', 'bar');
  ee.emit('foo', 'bar', 'baz');
  ee.emit('foo', 'bar', 'baz', 'boom');
}).add('contra/emitter', function() {
  ce.emit('foo');
  ce.emit('foo', 'bar');
  ce.emit('foo', 'bar', 'baz');
  ce.emit('foo', 'bar', 'baz', 'boom');
}).on('cycle', function cycle(e) {
  var details = e.target;

  logger.log('Finished benchmarking: "%s"', details.name);
  logger.metric('Count (%d), Cycles (%d), Elapsed (%d), Hz (%d)'
    , details.count
    , details.cycles
    , details.times.elapsed
    , details.hz.toFixed(2)
  );
}).on('complete', function completed() {
  logger.info('Benchmark: "%s" is the fastest.'
    , this.filter('fastest').map('name')
  );
}).run();
