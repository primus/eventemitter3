# EventEmitter3

[![Version npm](https://img.shields.io/npm/v/eventemitter3.svg?style=flat-square)](http://browsenpm.org/package/eventemitter3)[![Build Status](https://img.shields.io/travis/primus/eventemitter3/master.svg?style=flat-square)](https://travis-ci.org/primus/eventemitter3)[![Dependencies](https://img.shields.io/david/primus/eventemitter3.svg?style=flat-square)](https://david-dm.org/primus/eventemitter3)[![Coverage Status](https://img.shields.io/coveralls/primus/eventemitter3/master.svg?style=flat-square)](https://coveralls.io/r/primus/eventemitter3?branch=master)[![IRC channel](https://img.shields.io/badge/IRC-irc.freenode.net%23primus-00a8ff.svg?style=flat-square)](https://webchat.freenode.net/?channels=primus)

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
or as a component

```bash
$ component install primus/eventemitter3
```

then

```js
var EventEmitter = require('eventemitter3');

// or

var EventEmitter = require('eventemitter3').EventEmitter;
```

For API methods see the official Node.js documentation:

http://nodejs.org/api/events.html
