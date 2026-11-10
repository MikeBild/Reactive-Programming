import { auditTime, bufferTime, filter, interval, map, type Observable } from 'rxjs'

/** A sensor that sends perSecond values per second. The n-th value is read(n). */
export const sensor$ = (perSecond = 1_000, read: (n: number) => number = () => Math.random() * 100): Observable<number> =>
  interval(1_000 / perSecond).pipe(map((n) => read(n)))

/** Live value: the newest value at the end of every window. auditTime discards everything in between. */
export const liveValue = (source$: Observable<number>, ms = 1_000): Observable<number> => source$.pipe(auditTime(ms))

/** Average per window. bufferTime discards nothing, it collects. */
export const averagePer = (source$: Observable<number>, ms = 1_000): Observable<number> =>
  source$.pipe(
    bufferTime(ms),
    filter((batch) => batch.length > 0),
    map((batch) => batch.reduce((sum, value) => sum + value, 0) / batch.length),
  )
