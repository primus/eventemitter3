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

function foo() {
  if (arguments.length > 100) console.log('damn');

  return 1;
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
  , ce = CE()
  , j, i;

for (i = 0; i < 10; i++) {
  for (j = 0; j < 10; j++) {
    ce.on('event:' + i, foo);
    ee.on('event:' + i, foo);
    fe.on('event:' + i, foo);
    ee1.on('event:' + i, foo);
    ee2.on('event:' + i, foo);
    ee3.on('event:' + i, foo);
    drip.on('event:' + i, foo);
    master.on('event:' + i, foo);
  }
}

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  for (i = 0; i < 10; i++) {
    ee1.emit('event:' + i);
  }
}).add('EventEmitter2', function() {
  for (i = 0; i < 10; i++) {
    ee2.emit('event:' + i);
  }
}).add('EventEmitter3@0.1.6', function() {
  for (i = 0; i < 10; i++) {
    ee3.emit('event:' + i);
  }
}).add('EventEmitter3(master)', function() {
  for (i = 0; i < 10; i++) {
    master.emit('event:' + i);
  }
}).add('Drip', function() {
  for (i = 0; i < 10; i++) {
    drip.emit('event:' + i);
  }
}).add('fastemitter', function() {
  for (i = 0; i < 10; i++) {
    fe.emit('event:' + i);
  }
}).add('event-emitter', function() {
  for (i = 0; i < 10; i++) {
    ee.emit('event:' + i);
  }
}).add('contra/emitter', function() {
  for (i = 0; i < 10; i++) {
    ce.emit('event:' + i);
  }
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
