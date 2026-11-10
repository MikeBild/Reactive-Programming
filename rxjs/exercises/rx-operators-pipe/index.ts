/**
 * Lesson rx-operators-pipe: Operators are functions in a pipe
 *
 * Task: Process a stream of messages with type and payload,
 * filter by type, drop duplicates via distinctUntilChanged with a
 * compare function, and count with scan.
 *
 * For that, write two operators of your own with pipe() without a source.
 * A duplicate is a message with the same id as the one directly before it,
 * for example because the queue delivers it again after a timeout.
 */
import { type OperatorFunction } from 'rxjs'

export type Message<P = unknown> = { type: string; id: string; payload: P }

/** Lets only messages of one type through, without directly repeated ids, and emits their payload. */
export const ofType = <P>(type: string): OperatorFunction<Message, P> => {
  // TODO: filter by type, distinctUntilChanged comparing the id, map to payload
  throw new Error('TODO: ofType')
}

/** Counts the messages of one type without duplicates, emits the running count after every message. */
export const countOfType = (type: string): OperatorFunction<Message, number> => {
  // TODO: reuse ofType and count with scan
  throw new Error('TODO: countOfType')
}
