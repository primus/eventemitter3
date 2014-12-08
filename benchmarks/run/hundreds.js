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
  , EE = require('event-emitter')
  , FE = require('fastemitter');

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
  , j, i;

for (i = 0; i < 10; i++) {
  for (j = 0; j < 10; j++) {
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
).add('EventEmitter 1', function test1() {
  for (i = 0; i < 10; i++) {
    ee1.emit('event:' + i);
  }
}).add('EventEmitter 2', function test2() {
  for (i = 0; i < 10; i++) {
    ee2.emit('event:' + i);
  }
}).add('EventEmitter 3', function test2() {
  for (i = 0; i < 10; i++) {
    ee3.emit('event:' + i);
  }
}).add('EventEmitter 3 (master)', function test2() {
  for (i = 0; i < 10; i++) {
    master.emit('event:' + i);
  }
}).add('Drip', function test2() {
  for (i = 0; i < 10; i++) {
    drip.emit('event:' + i);
  }
}).add('fastemitter', function test2() {
  for (i = 0; i < 10; i++) {
    fe.emit('event:' + i);
  }
}).add('event-emitter', function test2() {
  for (i = 0; i < 10; i++) {
    ee.emit('event:' + i);
  }
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
