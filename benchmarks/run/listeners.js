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
var EventEmitter3 = require('eventemitter3')
  , EventEmitter1 = require('events').EventEmitter
  , Master = require('../../')
  , FE = require('fastemitter');

var MAX_LISTENERS = Math.pow(2, 32) - 1;

function handle() {
  if (arguments.length > 100) console.log('damn');
}

/**
 * Instances.
 */
var ee3 = new EventEmitter3()
  , ee1 = new EventEmitter1()
  , master = new Master()
  , fe = new FE();

ee1.setMaxListeners(MAX_LISTENERS);
fe.setMaxListeners(MAX_LISTENERS);

for (var i = 0; i < 25; i++) {
  ee1.on('event', handle);
  ee3.on('event', handle);
  master.on('event', handle);
  fe.on('event', handle);
}

//
// EE2 doesn't correctly handle listeners as they can be removed by doing a
// ee2.listeners('event').length = 0; kills the event emitter, same counts for
// Drip.
// event-emitter and contra/emitter does not implement.
//

(
  new benchmark.Suite()
).add('EventEmitter1', function () {
  ee1.listeners('event');
}).add('fastemitter', function() {
  fe.listeners('event');
}).add('EventEmitter3@0.1.6', function() {
  ee3.listeners('event');
}).add('EventEmitter3(master)', function() {
  master.listeners('event');
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
