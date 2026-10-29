/**
 * Lektion rx-creation: Fast alles wird zum Observable
 *
 * Aufgabe: Erzeuge aus Klicks auf einen Button, einem Timer und einem
 * fetch-Promise je ein Observable und logge alle drei Streams mit Präfix.
 *
 * Statt document und fetch bekommst du einen EventTarget und eine
 * async Function übergeben. So läuft alles in Node.js und im Test.
 * Probier es aus: node exercises/rx-creation/demo.ts
 */
import { Observable } from 'rxjs'

export type User = { id: string; name: string }

/** Jeder click-Event auf dem Button wird ein Wert. */
export const clicks$ = (button: EventTarget): Observable<Event> => {
  // TODO: fromEvent
  throw new Error('TODO: clicks$')
}

/** Zählt ab 0 hoch, ein Wert alle ms Millisekunden. */
export const ticks$ = (ms: number): Observable<number> => {
  // TODO: interval
  throw new Error('TODO: ticks$')
}

/** Lädt den User erst beim subscribe, für jeden Subscriber neu. */
export const user$ = (loadUser: () => Promise<User>): Observable<User> => {
  // TODO: defer, damit loadUser nicht schon beim Erzeugen läuft
  throw new Error('TODO: user$')
}

/** Macht aus jedem Wert eine Zeile „prefix: wert“. */
export const withPrefix = <T>(prefix: string, source$: Observable<T>): Observable<string> => {
  // TODO: map
  throw new Error('TODO: withPrefix')
}

/** Alle drei Streams als ein Log-Stream mit Präfix click, tick und user. */
export const log$ = (button: EventTarget, ms: number, loadUser: () => Promise<User>): Observable<string> => {
  // TODO: merge aus withPrefix('click', ...), withPrefix('tick', ...), withPrefix('user', ...)
  //       Für Klicks reicht der Event-Typ, für den User der Name.
  throw new Error('TODO: log$')
}
