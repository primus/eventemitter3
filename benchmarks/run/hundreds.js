'use strict';

var benchmark = require('benchmark');

var EventEmitter2 = require('eventemitter2').EventEmitter2
  , EventEmitter1 = require('events').EventEmitter
  , EventEmitter3 = require('eventemitter3')
  , Drip = require('drip').EventEmitter
  , CE = require('contra/emitter')
  , EE = require('event-emitter')
  , FE = require('fastemitter')
  , Master = require('../../');

function foo() {
  if (arguments.length > 100) console.log('damn');

  return 1;
}

var ee1 = new EventEmitter1()
  , ee2 = new EventEmitter2()
  , ee3 = new EventEmitter3()
  , master = new Master()
  , drip = new Drip()
  , fe = new FE()
  , ce = CE()
  , ee = EE()
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
  console.log(e.target.toString());
}).on('complete', function completed() {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
