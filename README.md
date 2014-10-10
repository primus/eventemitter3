# EventEmitter3

[![Build Status](https://travis-ci.org/primus/EventEmitter3.svg?branch=master)](https://travis-ci.org/primus/EventEmitter3)
[![NPM version](https://badge.fury.io/js/eventemitter3.svg)](http://badge.fury.io/js/eventemitter3)
[![Coverage Status](https://img.shields.io/coveralls/primus/EventEmitter3.svg)](https://coveralls.io/r/primus/EventEmitter3?branch=master)

EventEmitter3 is a faster alternative to EventEmitter2 and the built-in
EventEmitter that ships within Node.js. It removes some features that you might
not need:

- Domain support.
- Thrown errors when there are no error listeners specified.
- That a `newListener` event is emitted when an event is emitted.
- No silly `setMaxListeners`, the function exists, but does nothing.
- No silly `listenerCount` function.. Just do `EventEmitter.listeners(event).length`

And adds some features you want:

- Emit events with a custom context without binding: `EE.on(event, fn, context)`
  which also works with once `EE.once(event, fn, context)`

It's a drop in replacement of your existing EventEmitters, but just faster. Free
performance, who wouldn't want that?

The source of the EventEmitter is compatible for browser usage, no fancy pancy
`Array.isArray` stuff is used, it's just plain ol JavaScript that should even
work IE5 if you want to.

## Installation

```bash
$ npm install --save eventemitter3
```
or as a [component](http://component.io)

```bash
$ component install eventemitter3
```

then

```js
var EventEmitter = require('eventemitter3');

// or

var EventEmitter = require('eventemitter3').EventEmitter;
```

For API methods see the official Node.js documentation:

http://nodejs.org/api/events.html
