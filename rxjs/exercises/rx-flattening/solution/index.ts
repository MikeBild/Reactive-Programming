import { concatMap, exhaustMap, mergeMap, switchMap, type Observable } from 'rxjs'

/** Suche: nur das Ergebnis zum neuesten Begriff zählt. */
export const searchResults = (
  term$: Observable<string>,
  search: (term: string) => Observable<string[]>,
): Observable<string[]> =>
  // switchMap: Ein neuer Begriff macht die laufende Suche wertlos, also abbrechen und wechseln.
  // Lesende Requests darf man gefahrlos abbrechen.
  term$.pipe(switchMap((term) => search(term)))

/** Autosave: jede Änderung speichern, in der Reihenfolge, in der sie entstanden ist. */
export const autosave = <T>(change$: Observable<T>, save: (change: T) => Observable<T>): Observable<T> =>
  // concatMap: Keine Änderung darf verloren gehen und die Reihenfolge muss stimmen.
  // switchMap könnte einen halben Speichervorgang abbrechen, mergeMap die Reihenfolge vertauschen.
  change$.pipe(concatMap((change) => save(change)))

/** Upload-Queue: Dateien parallel hochladen, aber höchstens concurrency gleichzeitig. */
export const uploadQueue = (
  file$: Observable<string>,
  upload: (file: string) => Observable<string>,
  concurrency: number,
): Observable<string> =>
  // mergeMap mit Limit: Uploads sind unabhängig, parallel ist schneller.
  // Ohne Limit liefen hundert Dateien als hundert Requests gleichzeitig.
  file$.pipe(mergeMap((file) => upload(file), concurrency))

/** Login: ein Doppelklick darf keinen zweiten Request starten, solange der erste läuft. */
export const loginOnClick = <S>(click$: Observable<unknown>, login: () => Observable<S>): Observable<S> =>
  // exhaustMap: Solange ein Login läuft, werden weitere Klicks ignoriert.
  click$.pipe(exhaustMap(() => login()))
