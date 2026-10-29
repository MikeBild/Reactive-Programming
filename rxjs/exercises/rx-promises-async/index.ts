/**
 * Lektion rx-promises-async: Promises und Observables arbeiten zusammen
 *
 * Aufgabe: Schreib eine Funktion fromAbortable(task), die eine async-Funktion
 * mit AbortSignal als Observable liefert, und prüf im Test, dass unsubscribe
 * den Abort auslöst.
 *
 * Zusatz: Hol mit firstValueFrom die ersten drei Preise als Array.
 */
import { Observable } from 'rxjs'

export const fromAbortable = <T>(task: (signal: AbortSignal) => Promise<T>): Observable<T> =>
  new Observable<T>((subscriber) => {
    // TODO: AbortController anlegen, task(controller.signal) starten,
    //       Ergebnis per next und complete, Fehler per error weiterreichen,
    //       als Teardown controller.abort() zurückgeben
    subscriber.error(new Error('TODO: fromAbortable'))
  })

/** Die ersten drei Preise als Array, danach meldet sich die Funktion ab. */
export const firstThree = (prices$: Observable<number>): Promise<number[]> => {
  // TODO: firstValueFrom mit take(3) und toArray
  throw new Error('TODO: firstThree')
}
