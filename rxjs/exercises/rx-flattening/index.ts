/**
 * Lesson rx-flattening: switchMap, mergeMap, concatMap, or exhaustMap?
 *
 * Task: Build a search, an autosave, an upload queue, and a
 * login button, each with one flattening operator, and justify every choice in
 * a code comment.
 *
 * All services come in as parameters. In the test, a cold
 * Observable replaces them, without any mock library.
 */
import { Observable } from 'rxjs'

/** Search: only the result for the latest term counts. */
export const searchResults = (
  term$: Observable<string>,
  search: (term: string) => Observable<string[]>,
): Observable<string[]> => {
  // TODO: Which operator? Reasoning:
  throw new Error('TODO: searchResults')
}

/** Autosave: save every change, in the order in which it happened. */
export const autosave = <T>(change$: Observable<T>, save: (change: T) => Observable<T>): Observable<T> => {
  // TODO: Which operator? Reasoning:
  throw new Error('TODO: autosave')
}

/** Upload queue: upload files in parallel, but at most concurrency at a time. */
export const uploadQueue = (
  file$: Observable<string>,
  upload: (file: string) => Observable<string>,
  concurrency: number,
): Observable<string> => {
  // TODO: Which operator? Reasoning:
  throw new Error('TODO: uploadQueue')
}

/** Login: a double click must not start a second request while the first one is running. */
export const loginOnClick = <S>(click$: Observable<unknown>, login: () => Observable<S>): Observable<S> => {
  // TODO: Which operator? Reasoning:
  throw new Error('TODO: loginOnClick')
}
