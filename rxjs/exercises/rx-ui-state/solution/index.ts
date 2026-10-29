import { Subject, distinctUntilChanged, map, scan, shareReplay, startWith, type Observable } from 'rxjs'

export type Todo = { id: string; title: string; done: boolean }

export type Action =
  | { type: 'add'; id: string; title: string }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }

/** Reiner Reducer für die Todos. Gibt immer einen neuen Array zurück. */
export const reduceTodos = (todos: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'add':
      return [...todos, { id: action.id, title: action.title, done: false }]
    case 'toggle':
      return todos.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo))
    case 'remove':
      return todos.filter((todo) => todo.id !== action.id)
  }
}

/** Reiner Reducer für die LRU-Liste der letzten Suchen. */
export const pushRecent =
  (limit: number) =>
  (recent: string[], term: string): string[] => {
    const trimmed = term.trim()
    if (trimmed === '') return recent
    return [trimmed, ...recent.filter((entry) => entry !== trimmed)].slice(0, limit)
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
  const actions = new Subject<Action>()
  const searches = new Subject<string>()

  const todos$ = actions.pipe(
    scan(reduceTodos, [] as Todo[]),
    startWith([] as Todo[]),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  const openCount$ = todos$.pipe(
    map((todos) => todos.filter((todo) => !todo.done).length),
    distinctUntilChanged(),
  )

  const recentSearches$ = searches.pipe(
    scan(pushRecent(5), [] as string[]),
    distinctUntilChanged(),
    startWith([] as string[]),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  return {
    add: (title) => actions.next({ type: 'add', id: createId(), title }),
    toggle: (id) => actions.next({ type: 'toggle', id }),
    remove: (id) => actions.next({ type: 'remove', id }),
    search: (term) => searches.next(term),
    todos$,
    openCount$,
    recentSearches$,
  }
}
