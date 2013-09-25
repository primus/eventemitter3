# EventEmitter3

EventEmitter3 is a faster alternative to EventEmitter2 and the build-in
EventEmitter that ships within Node.js. It removes some features that you might
not need:

- Domain support.
- Thrown errors when there are no error listeners specified.
- That a `newListener` event is emitted when an event is emitted.
- No silly `setMaxListeners`.
- No silly `listenerCount` function.. Just do `EventEmitter.listeners(event).length`

It's a drop in replacement of your existing EventEmitters, but just faster. Free
performance, who wouldn't want that.

## Installation

```bash
npm install --save eventemitter3
```

For API methods see the offical Node.js documentation: 

http://nodejs.org/api/events.html
