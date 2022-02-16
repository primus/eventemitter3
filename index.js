"use strict";

let has = Object.prototype.hasOwnProperty;
let prefix = "~";

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} callback The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(callback, context, once) {
  this.callback = callback;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} callback The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, callback, context, once) {
  if (typeof callback !== "function") {
    throw new TypeError("The listener must be a function");
  }

  let listener = new EE(callback, context || emitter, once);
  let eventName = prefix ? prefix + event : event;

  if (!emitter._events[eventName]) {
    emitter._events[eventName] = listener;
    emitter._eventsCount++;
  } else if (!emitter._events[eventName].callback)
    emitter._events[eventName].push(listener);
  else emitter._events[eventName] = [emitter._events[eventName], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} eventName The Event name.
 * @private
 */
function clearEvent(emitter, eventName) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[eventName];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.getEventNames = function getEventNames() {
  let names = [];
  let events = this._events;

  if (this._eventsCount === 0) return names;

  for (let name in events) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.getListeners = function getListeners(event) {
  let eventName = prefix ? prefix + event : event;
  let handlers = this._events[eventName];

  if (!handlers) return [];
  if (handlers.callback) return [handlers.callback];

  for (let i = 0, l = handlers.length, listeners = new Array(l); i < l; i++) {
    listeners[i] = handlers[i].callback;
  }

  return listeners;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.getListenerCount = function getListenerCount(event) {
  let eventName = prefix ? prefix + event : event,
    listeners = this._events[eventName];

  if (!listeners) return 0;
  if (listeners.callback) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, ...args) {
  let eventName = prefix ? prefix + event : event;

  if (!this._events[eventName]) return false;

  let currentListeners = this._events[eventName];

  //if there is only one listener
  if (currentListeners.callback) {
    if (currentListeners.once) {
      this.removeListener(event, listeners.callback, undefined, true);
    }

    currentListeners.callback.apply(listeners.context, args);
  } else {
    let length = listeners.length,
      j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) {
        this.removeListener(event, listeners[i].callback, undefined, true);
      }
      listeners[i].callback.apply(listeners[i].context, args);
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} callback The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, callback, context) {
  return addListener(this, event, callback, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} callback The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, callback, context) {
  return addListener(this, event, callback, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} callback Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(
  event,
  callback,
  context,
  once
) {
  let eventName = prefix ? prefix + event : event;

  if (!this._events[eventName]) return this;
  if (!callback) {
    clearEvent(this, eventName);
    return this;
  }

  let listeners = this._events[eventName];

  if (listeners.callback) {
    if (
      listeners.callback === callback &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, eventName);
    }
  } else {
    for (let i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].callback !== callback ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length)
      this._events[eventName] = events.length === 1 ? events[0] : events;
    else clearEvent(this, eventName);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  let eventName;

  if (event) {
    eventName = prefix ? prefix + event : event;
    if (this._events[eventName]) clearEvent(this, eventName);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ("undefined" !== typeof module) {
  module.exports = EventEmitter;
}
