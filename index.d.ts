/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 */
declare class EventEmitter {
  static prefixed: string | boolean;

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   */
  eventNames(): Array<string | symbol>;

  /**
   * Return the listeners registered for a given event.
   */
  listeners(event: string | symbol): Array<EventEmitter.ListenerFn>;

  /**
   * Return the number of listeners listening to a given event.
   */
  listenerCount(event: string | symbol): number;

  /**
   * Calls each of the listeners registered for a given event.
   */
  emit(event: string | symbol, ...args: Array<any>): boolean;

  /**
   * Add a listener for a given event.
   */
  on(event: string | symbol, fn: EventEmitter.ListenerFn, context?: any): this;
  addListener(event: string | symbol, fn: EventEmitter.ListenerFn, context?: any): this;

  /**
   * Add a one-time listener for a given event.
   */
  once(event: string | symbol, fn: EventEmitter.ListenerFn, context?: any): this;

  /**
   * Remove the listeners of a given event.
   */
  removeListener(event: string | symbol, fn?: EventEmitter.ListenerFn, context?: any, once?: boolean): this;
  off(event: string | symbol, fn?: EventEmitter.ListenerFn, context?: any, once?: boolean): this;

  /**
   * Remove all listeners, or those of the specified event.
   */
  removeAllListeners(event?: string | symbol): this;
}

declare namespace EventEmitter {
  export interface ListenerFn {
    (...args: Array<any>): void;
  }

  export interface EventEmitterStatic {
    new(): EventEmitter;
  }

  export const EventEmitter: EventEmitterStatic;
}

export = EventEmitter;
