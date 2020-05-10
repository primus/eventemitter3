type ValidEventTypes<T = any> = string | symbol | T extends {
  [K in keyof T]: any[] | ((...args: any[]) => void);
}
  ? T
  : never;

type EventNames<T extends ValidEventTypes> = T extends string | symbol
  ? T
  : keyof T;

type Handler<
  T extends any[] | ((...args: any[]) => R),
  R = any
> = T extends any[] ? (...args: T) => R : T;

type EventListener<
  T extends ValidEventTypes,
  K extends EventNames<T>
> = T extends string | symbol
  ? (...args: any[]) => void
  : K extends keyof T
  ? Handler<T[K], void>
  : never;

type EventArgs<T extends ValidEventTypes, K extends EventNames<T>> = Parameters<
  EventListener<T, K>
>;

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 */
declare class EventEmitter<
  EventTypes extends
    | string
    | symbol
    | {}
    | { [K in keyof EventTypes]: any[] | ((...args: any[]) => void) } =
    | string
    | symbol,
  Context extends any = any
> {
  static prefixed: string | boolean;

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   */
  eventNames(): Array<EventNames<EventTypes>>;

  /**
   * Return the listeners registered for a given event.
   */
  listeners<T extends EventNames<EventTypes>>(
    event: T
  ): Array<EventListener<EventTypes, T>>;

  /**
   * Return the number of listeners listening to a given event.
   */
  listenerCount(event: EventNames<EventTypes>): number;

  /**
   * Calls each of the listeners registered for a given event.
   */
  emit<T extends EventNames<EventTypes>>(
    event: T,
    ...args: EventArgs<EventTypes, T>
  ): boolean;

  /**
   * Add a listener for a given event.
   */
  on<T extends EventNames<EventTypes>>(
    event: T,
    fn: EventListener<EventTypes, T>,
    context?: Context
  ): this;
  addListener<T extends EventNames<EventTypes>>(
    event: T,
    fn: EventListener<EventTypes, T>,
    context?: Context
  ): this;

  /**
   * Add a one-time listener for a given event.
   */
  once<T extends EventNames<EventTypes>>(
    event: T,
    fn: EventListener<EventTypes, T>,
    context?: Context
  ): this;

  /**
   * Remove the listeners of a given event.
   */
  removeListener<T extends EventNames<EventTypes>>(
    event: T,
    fn?: EventListener<EventTypes, T>,
    context?: Context,
    once?: boolean
  ): this;
  off<T extends EventNames<EventTypes>>(
    event: T,
    fn?: EventListener<EventTypes, T>,
    context?: Context,
    once?: boolean
  ): this;

  /**
   * Remove all listeners, or those of the specified event.
   */
  removeAllListeners(event?: EventNames<EventTypes>): this;
}

declare namespace EventEmitter {
  export interface ListenerFn<Args extends any[] = any[]> {
    (...args: Args): void;
  }

  export interface EventEmitterStatic {
    new <EventTypes extends ValidEventTypes>(): EventEmitter<EventTypes>;
  }

  export const EventEmitter: EventEmitterStatic;
}

export = EventEmitter;
