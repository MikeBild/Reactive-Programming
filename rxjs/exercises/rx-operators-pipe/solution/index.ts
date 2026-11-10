import { distinctUntilChanged, filter, map, pipe, scan, type OperatorFunction } from 'rxjs'

export type Message<P = unknown> = { type: string; id: string; payload: P }

/** Lets only messages of one type through, without directly repeated ids, and emits their payload. */
export const ofType = <P>(type: string): OperatorFunction<Message, P> =>
  pipe(
    filter((message) => message.type === type),
    distinctUntilChanged((previous, current) => previous.id === current.id),
    map((message) => message.payload as P),
  )

/** Counts the messages of one type without duplicates, emits the running count after every message. */
export const countOfType = (type: string): OperatorFunction<Message, number> =>
  pipe(
    ofType(type),
    scan((count) => count + 1, 0),
  )
