/**
 * Lesson rx-observable-contract: Nothing happens without subscribe
 *
 * Task: Write an Observable ticker(ms) that counts up with setInterval,
 * reports complete after five values, and stops the timer on unsubscribe.
 *
 * The contract: next any number of times, then at most once error or complete.
 * The teardown function you return cleans up.
 */
import { Observable } from 'rxjs'

export const ticker = (ms: number, count = 5): Observable<number> =>
  new Observable<number>((subscriber) => {
    // TODO: start setInterval, send 0, 1, 2, ..., report complete after count values
    // TODO: return a teardown function that calls clearInterval
  })
