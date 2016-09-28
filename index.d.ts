export as namespace EventEmitter;

type ListenerFn = (...args: Array<any>) => void;

/**
  * Minimal `EventEmitter` interface that is molded against the Node.js
  * `EventEmitter` interface.
  */
export class EventEmitter {
  prefix: string;

  /**
    * Return an array listing the events for which the emitter has registered
    * listeners.
    */
  eventNames(): Array<string | symbol>;

  /**
    * Return the listeners registered for a given event.
    */
  listeners(event: string | symbol): Array<ListenerFn>;
  listeners(event: string | symbol, exists: boolean): Array<ListenerFn> | boolean;

  /**
    * Calls each of the listeners registered for a given event.
    */
  emit(event: string | symbol, ...args: Array<any>): boolean;

  /**
    * Add a listener for a given event.
    */
  on(event: string | symbol, fn: ListenerFn, context?: any): EventEmitter;
  addListener(event: string | symbol, fn: ListenerFn, context?: any): EventEmitter;

  /**
    * Add a one-time listener for a given event.
    */
  once(event: string | symbol, fn: ListenerFn, context?: any): EventEmitter;

  /**
    * Remove the listeners of a given event.
    */
  removeListener(event: string | symbol, fn?: ListenerFn, context?: any, once?: boolean): EventEmitter;
  off(event: string | symbol, fn?: ListenerFn, context?: any, once?: boolean): EventEmitter;

  /**
    * Remove all listeners, or those of the specified event.
    */
  removeAllListeners(event: string | symbol): EventEmitter;
}
