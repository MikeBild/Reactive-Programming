/**
 * Lektion rx-flattening: switchMap, mergeMap, concatMap oder exhaustMap?
 *
 * Aufgabe: Bau eine Suche, einen Autosave, eine Upload-Queue und einen
 * Login-Button mit je einem Flattening-Operator und begründe jede Wahl im
 * Code-Kommentar.
 *
 * Alle Services kommen als Parameter rein. Im Test ersetzt sie ein cold
 * Observable, ganz ohne Mock-Library.
 */
import { Observable } from 'rxjs'

/** Suche: nur das Ergebnis zum neuesten Begriff zählt. */
export const searchResults = (
  term$: Observable<string>,
  search: (term: string) => Observable<string[]>,
): Observable<string[]> => {
  // TODO: Welcher Operator? Begründung:
  throw new Error('TODO: searchResults')
}

/** Autosave: jede Änderung speichern, in der Reihenfolge, in der sie entstanden ist. */
export const autosave = <T>(change$: Observable<T>, save: (change: T) => Observable<T>): Observable<T> => {
  // TODO: Welcher Operator? Begründung:
  throw new Error('TODO: autosave')
}

/** Upload-Queue: Dateien parallel hochladen, aber höchstens concurrency gleichzeitig. */
export const uploadQueue = (
  file$: Observable<string>,
  upload: (file: string) => Observable<string>,
  concurrency: number,
): Observable<string> => {
  // TODO: Welcher Operator? Begründung:
  throw new Error('TODO: uploadQueue')
}

/** Login: ein Doppelklick darf keinen zweiten Request starten, solange der erste läuft. */
export const loginOnClick = <S>(click$: Observable<unknown>, login: () => Observable<S>): Observable<S> => {
  // TODO: Welcher Operator? Begründung:
  throw new Error('TODO: loginOnClick')
}
