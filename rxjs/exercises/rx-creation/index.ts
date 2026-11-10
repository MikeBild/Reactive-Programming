/**
 * Lesson rx-creation: Almost everything becomes an Observable
 *
 * Task: Create an Observable each from clicks on a button, a timer, and a
 * fetch Promise, and log all three streams with a prefix.
 *
 * Instead of document and fetch you get an EventTarget and an
 * async function passed in. That way everything runs in Node.js and in the test.
 * Try it out: node exercises/rx-creation/demo.ts
 */
import { Observable } from 'rxjs'

export type User = { id: string; name: string }

/** Every click event on the button becomes a value. */
export const clicks$ = (button: EventTarget): Observable<Event> => {
  // TODO: fromEvent
  throw new Error('TODO: clicks$')
}

/** Counts up from 0, one value every ms milliseconds. */
export const ticks$ = (ms: number): Observable<number> => {
  // TODO: interval
  throw new Error('TODO: ticks$')
}

/** Loads the user only on subscribe, anew for every subscriber. */
export const user$ = (loadUser: () => Promise<User>): Observable<User> => {
  // TODO: defer, so that loadUser does not already run on creation
  throw new Error('TODO: user$')
}

/** Turns every value into a line “prefix: value”. */
export const withPrefix = <T>(prefix: string, source$: Observable<T>): Observable<string> => {
  // TODO: map
  throw new Error('TODO: withPrefix')
}

/** All three streams as one log stream with the prefixes click, tick, and user. */
export const log$ = (button: EventTarget, ms: number, loadUser: () => Promise<User>): Observable<string> => {
  // TODO: merge of withPrefix('click', ...), withPrefix('tick', ...), withPrefix('user', ...)
  //       For clicks the event type is enough, for the user the name.
  throw new Error('TODO: log$')
}
