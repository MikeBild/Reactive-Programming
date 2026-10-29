/**
 * Lektion rx-signals-interop: Signals oder Observables?
 *
 * Aufgabe: Nimm das Todo View Model, stell den Zustand als Signal bereit und
 * lass die Suche mit debounceTime und switchMap als Observable laufen.
 *
 * Statt Angular nutzt du das kleine Signal aus signal.ts und baust die beiden
 * Brücken selbst, die Angular in @angular/core/rxjs-interop mitbringt:
 * toObservable und toSignal.
 */
import { Observable } from 'rxjs'
import { type Signal, type WritableSignal } from './signal.js'

export type Todo = { id: string; title: string; done: boolean }

/** Signal -> Observable: liefert sofort den aktuellen Wert, danach jede Änderung. */
export const toObservable = <T>(source: Signal<T>): Observable<T> =>
  new Observable<T>((subscriber) => {
    // TODO: aktuellen Wert senden, source.subscribe(...) anmelden, beim Teardown abmelden
    subscriber.error(new Error('TODO: toObservable'))
  })

/** Observable -> Signal: das Signal hält immer den letzten Wert, bis unsubscribe. */
export const toSignal = <T>(source$: Observable<T>, initialValue: T): { value: Signal<T>; unsubscribe: () => void } => {
  // TODO: signal(initialValue) anlegen, source$ abonnieren und per set schreiben
  throw new Error('TODO: toSignal')
}

export type TodoSearchViewModel = {
  /** Zustand als Signal */
  todos: Signal<Todo[]>
  add: (id: string, title: string) => void
  toggle: (id: string) => void
  /** Eingabe als Signal */
  term: WritableSignal<string>
  /** Ergebnis der Suche als Signal, die Zeitlogik dazwischen läuft als Observable */
  results: Signal<Todo[]>
  destroy: () => void
}

export const createTodoSearchViewModel = (
  search: (term: string) => Observable<Todo[]>,
  debounceMs = 300,
): TodoSearchViewModel => {
  // TODO: todos und term als signal
  // TODO: results = toSignal(toObservable(term).pipe(debounceTime, distinctUntilChanged, switchMap(search)), [])
  throw new Error('TODO: createTodoSearchViewModel')
}
