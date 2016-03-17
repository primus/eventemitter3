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

(
  new benchmark.Suite()
).add('<test1>', function() {

}).add('<test2>', function() {

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
