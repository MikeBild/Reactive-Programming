/**
 * Lektion rx-ui-state: UI-Zustand als Stream von Aktionen
 *
 * Aufgabe: Bau ein Todo View Model mit add, toggle und remove als Aktionen,
 * führe den Zustand mit scan und halte eine Liste der letzten fünf Suchen als LRU.
 *
 * LRU heißt Least Recently Used: Die neueste Suche steht vorn. Kommt ein
 * Begriff erneut, wandert er nach vorn statt doppelt in der Liste zu stehen.
 * Ab sechs Einträgen fällt der älteste hinten heraus.
 *
 * Die Reducer sind reine Functions. Teste sie ohne Streams, den Rest mit scan.
 */
import { Observable } from 'rxjs'

export type Todo = { id: string; title: string; done: boolean }

export type Action =
  | { type: 'add'; id: string; title: string }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }

/** Reiner Reducer für die Todos. Gibt immer einen neuen Array zurück. */
export const reduceTodos = (todos: Todo[], action: Action): Todo[] => {
  // TODO: add hängt an, toggle dreht done um, remove entfernt
  throw new Error('TODO: reduceTodos')
}

/** Reiner Reducer für die LRU-Liste der letzten Suchen. */
export const pushRecent =
  (limit: number) =>
  (recent: string[], term: string): string[] => {
    // TODO: term nach vorn, Duplikat entfernen, auf limit kürzen. Leere Begriffe ignorieren.
    throw new Error('TODO: pushRecent')
  }

export type TodoViewModel = {
  add: (title: string) => void
  toggle: (id: string) => void
  remove: (id: string) => void
  search: (term: string) => void
  todos$: Observable<Todo[]>
  openCount$: Observable<number>
  recentSearches$: Observable<string[]>
}

export const createTodoViewModel = (createId: () => string = () => crypto.randomUUID()): TodoViewModel => {
  // TODO: Subject<Action> und Subject<string> für Suchen
  // TODO: todos$ mit scan(reduceTodos, []), startWith([]), shareReplay({ bufferSize: 1, refCount: true })
  // TODO: openCount$ aus todos$ ableiten, mit distinctUntilChanged
  // TODO: recentSearches$ mit scan(pushRecent(5), []), startWith([]), shareReplay
  throw new Error('TODO: createTodoViewModel')
}
