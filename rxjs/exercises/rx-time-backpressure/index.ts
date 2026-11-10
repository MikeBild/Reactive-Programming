/**
 * Lesson rx-time-backpressure: What if more events arrive than you can process?
 *
 * Task: Simulate a sensor with a thousand values per second and show it
 * once via auditTime as a live value and once via bufferTime as an
 * average per second.
 *
 * Try it out: node exercises/rx-time-backpressure/demo.ts
 */
import { Observable } from 'rxjs'

/** A sensor that sends perSecond values per second. The n-th value is read(n). */
export const sensor$ = (perSecond = 1_000, read: (n: number) => number = () => Math.random() * 100): Observable<number> => {
  // TODO: interval with 1000 / perSecond, then map to read
  throw new Error('TODO: sensor$')
}

/** Live value: the newest value at the end of every window. */
export const liveValue = (source$: Observable<number>, ms = 1_000): Observable<number> => {
  // TODO: auditTime
  throw new Error('TODO: liveValue')
}

/** Average per window. Empty windows emit no value. */
export const averagePer = (source$: Observable<number>, ms = 1_000): Observable<number> => {
  // TODO: bufferTime, filter empty batches, compute the average
  throw new Error('TODO: averagePer')
}
