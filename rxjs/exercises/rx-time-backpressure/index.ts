/**
 * Lektion rx-time-backpressure: Was tun, wenn mehr Events kommen, als du verarbeitest?
 *
 * Aufgabe: Simuliere einen Sensor mit tausend Werten pro Sekunde und zeig ihn
 * einmal per auditTime als Live-Wert und einmal per bufferTime als
 * Durchschnitt pro Sekunde an.
 *
 * Probier es aus: node exercises/rx-time-backpressure/demo.ts
 */
import { Observable } from 'rxjs'

/** Ein Sensor, der perSecond Werte pro Sekunde schickt. Der n-te Wert ist read(n). */
export const sensor$ = (perSecond = 1_000, read: (n: number) => number = () => Math.random() * 100): Observable<number> => {
  // TODO: interval mit 1000 / perSecond, dann map auf read
  throw new Error('TODO: sensor$')
}

/** Live-Wert: am Ende jedes Fensters der neueste Wert. */
export const liveValue = (source$: Observable<number>, ms = 1_000): Observable<number> => {
  // TODO: auditTime
  throw new Error('TODO: liveValue')
}

/** Durchschnitt pro Fenster. Leere Fenster liefern keinen Wert. */
export const averagePer = (source$: Observable<number>, ms = 1_000): Observable<number> => {
  // TODO: bufferTime, leere Batches filtern, Durchschnitt berechnen
  throw new Error('TODO: averagePer')
}
