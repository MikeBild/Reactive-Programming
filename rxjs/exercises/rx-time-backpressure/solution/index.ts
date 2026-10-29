import { auditTime, bufferTime, filter, interval, map, type Observable } from 'rxjs'

/** Ein Sensor, der perSecond Werte pro Sekunde schickt. Der n-te Wert ist read(n). */
export const sensor$ = (perSecond = 1_000, read: (n: number) => number = () => Math.random() * 100): Observable<number> =>
  interval(1_000 / perSecond).pipe(map((n) => read(n)))

/** Live-Wert: am Ende jedes Fensters der neueste Wert. Alles dazwischen verwirft auditTime. */
export const liveValue = (source$: Observable<number>, ms = 1_000): Observable<number> => source$.pipe(auditTime(ms))

/** Durchschnitt pro Fenster. bufferTime verwirft nichts, es sammelt. */
export const averagePer = (source$: Observable<number>, ms = 1_000): Observable<number> =>
  source$.pipe(
    bufferTime(ms),
    filter((batch) => batch.length > 0),
    map((batch) => batch.reduce((sum, value) => sum + value, 0) / batch.length),
  )
