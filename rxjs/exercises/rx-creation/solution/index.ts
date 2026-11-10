import { defer, fromEvent, interval, map, merge, type Observable } from 'rxjs'

export type User = { id: string; name: string }

/** Every click event on the button becomes a value. */
export const clicks$ = (button: EventTarget): Observable<Event> => fromEvent(button, 'click')

/** Counts up from 0, one value every ms milliseconds. */
export const ticks$ = (ms: number): Observable<number> => interval(ms)

/** Loads the user only on subscribe, anew for every subscriber. */
export const user$ = (loadUser: () => Promise<User>): Observable<User> => defer(() => loadUser())

/** Turns every value into a line “prefix: value”. */
export const withPrefix = <T>(prefix: string, source$: Observable<T>): Observable<string> =>
  source$.pipe(map((value) => `${prefix}: ${String(value)}`))

/** All three streams as one log stream with the prefixes click, tick, and user. */
export const log$ = (button: EventTarget, ms: number, loadUser: () => Promise<User>): Observable<string> =>
  merge(
    withPrefix('click', clicks$(button).pipe(map((event) => event.type))),
    withPrefix('tick', ticks$(ms)),
    withPrefix('user', user$(loadUser).pipe(map((user) => user.name))),
  )
