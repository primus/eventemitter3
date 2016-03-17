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

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  new EventEmitter1();
}).add('EventEmitter2', function() {
  new EventEmitter2();
}).add('EventEmitter3@0.1.6', function() {
  new EventEmitter3();
}).add('EventEmitter3(master)', function() {
  new Master();
}).add('Drip', function() {
  new Drip();
}).add('fastemitter', function() {
  new FE();
}).add('event-emitter', function() {
  EE({});
}).add('contra/emitter', function() {
  CE();
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
