import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs'
import { signal, type Signal, type WritableSignal } from '../signal.js'

export type Todo = { id: string; title: string; done: boolean }

/** Signal -> Observable: liefert sofort den aktuellen Wert, danach jede Änderung. */
export const toObservable = <T>(source: Signal<T>): Observable<T> =>
  new Observable<T>((subscriber) => {
    subscriber.next(source())
    return source.subscribe((value) => subscriber.next(value))
  })

/** Observable -> Signal: das Signal hält immer den letzten Wert, bis unsubscribe. */
export const toSignal = <T>(source$: Observable<T>, initialValue: T): { value: Signal<T>; unsubscribe: () => void } => {
  const value = signal(initialValue)
  const subscription = source$.subscribe((next) => value.set(next))
  return { value, unsubscribe: () => subscription.unsubscribe() }
}

export type TodoSearchViewModel = {
  todos: Signal<Todo[]>
  add: (id: string, title: string) => void
  toggle: (id: string) => void
  term: WritableSignal<string>
  results: Signal<Todo[]>
  destroy: () => void
}

export const createTodoSearchViewModel = (
  search: (term: string) => Observable<Todo[]>,
  debounceMs = 300,
): TodoSearchViewModel => {
  // Zustand ohne Zeitlogik: Signal
  const todos = signal<Todo[]>([])
  const term = signal('')

  // Zeit, Abbruch und Duplikate: Observable. Das Ergebnis geht als Signal zurück in die UI.
  const results = toSignal(
    toObservable(term).pipe(
      debounceTime(debounceMs),
      distinctUntilChanged(),
      switchMap((value) => search(value)),
    ),
    [] as Todo[],
  )

  return {
    todos,
    add: (id, title) => todos.update((list) => [...list, { id, title, done: false }]),
    toggle: (id) => todos.update((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t))),
    term,
    results: results.value,
    destroy: results.unsubscribe,
  }
}
