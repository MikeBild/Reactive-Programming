import { defer, fromEvent, interval, map, merge, type Observable } from 'rxjs'

export type User = { id: string; name: string }

/** Jeder click-Event auf dem Button wird ein Wert. */
export const clicks$ = (button: EventTarget): Observable<Event> => fromEvent(button, 'click')

/** Zählt ab 0 hoch, ein Wert alle ms Millisekunden. */
export const ticks$ = (ms: number): Observable<number> => interval(ms)

/** Lädt den User erst beim subscribe, für jeden Subscriber neu. */
export const user$ = (loadUser: () => Promise<User>): Observable<User> => defer(() => loadUser())

/** Macht aus jedem Wert eine Zeile „prefix: wert“. */
export const withPrefix = <T>(prefix: string, source$: Observable<T>): Observable<string> =>
  source$.pipe(map((value) => `${prefix}: ${String(value)}`))

/** Alle drei Streams als ein Log-Stream mit Präfix click, tick und user. */
export const log$ = (button: EventTarget, ms: number, loadUser: () => Promise<User>): Observable<string> =>
  merge(
    withPrefix('click', clicks$(button).pipe(map((event) => event.type))),
    withPrefix('tick', ticks$(ms)),
    withPrefix('user', user$(loadUser).pipe(map((user) => user.name))),
  )
