import { distinctUntilChanged, filter, map, pipe, scan, type OperatorFunction } from 'rxjs'

export type Message<P = unknown> = { type: string; id: string; payload: P }

/** Lässt nur Nachrichten eines Typs durch, ohne direkt wiederholte ids, und liefert deren Payload. */
export const ofType = <P>(type: string): OperatorFunction<Message, P> =>
  pipe(
    filter((message) => message.type === type),
    distinctUntilChanged((previous, current) => previous.id === current.id),
    map((message) => message.payload as P),
  )

/** Zählt die Nachrichten eines Typs ohne Duplikate, gibt nach jeder Nachricht den Zwischenstand aus. */
export const countOfType = (type: string): OperatorFunction<Message, number> =>
  pipe(
    ofType(type),
    scan((count) => count + 1, 0),
  )
