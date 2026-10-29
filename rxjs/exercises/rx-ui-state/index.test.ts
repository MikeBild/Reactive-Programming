import { describe, expect, test } from 'vitest'
import { createTodoViewModel, pushRecent, reduceTodos, type Todo } from './index.js'

const sequentialIds = () => {
  let next = 0
  return () => String(++next)
}

const latest = <T>(values: T[]) => values[values.length - 1]

describe('rx-ui-state: Reducer', () => {
  test('add, toggle und remove ändern die Liste, ohne sie zu mutieren', () => {
    const empty: Todo[] = []
    const one = reduceTodos(empty, { type: 'add', id: '1', title: 'Rx lernen' })
    const toggled = reduceTodos(one, { type: 'toggle', id: '1' })
    const removed = reduceTodos(toggled, { type: 'remove', id: '1' })

    expect(empty).toEqual([])
    expect(one).toEqual([{ id: '1', title: 'Rx lernen', done: false }])
    expect(toggled).toEqual([{ id: '1', title: 'Rx lernen', done: true }])
    expect(one[0]?.done).toBe(false)
    expect(removed).toEqual([])
  })

  test('LRU: neueste Suche vorn, Duplikate wandern nach vorn, maximal fünf', () => {
    const push = pushRecent(5)
    const recent = ['a', 'b', 'c', 'd', 'e', 'f', 'c', ' ', 'g'].reduce(push, [])
    expect(recent).toEqual(['g', 'c', 'f', 'e', 'd'])
  })
})

describe('rx-ui-state: View Model', () => {
  test('todos$ startet leer und folgt den Aktionen', () => {
    const vm = createTodoViewModel(sequentialIds())
    const states: Todo[][] = []
    vm.todos$.subscribe((todos) => states.push(todos))

    vm.add('Einkaufen')
    vm.add('Kochen')
    vm.toggle('1')
    vm.remove('2')

    expect(states[0]).toEqual([])
    expect(latest(states)).toEqual([{ id: '1', title: 'Einkaufen', done: true }])
  })

  test('openCount$ meldet nur echte Änderungen', () => {
    const vm = createTodoViewModel(sequentialIds())
    const counts: number[] = []
    vm.openCount$.subscribe((count) => counts.push(count))

    vm.add('A')
    vm.add('B')
    vm.toggle('1')
    vm.toggle('99') // gibt es nicht, die Zahl bleibt gleich

    expect(counts).toEqual([0, 1, 2, 1])
  })

  test('späte Subscriber bekommen sofort den aktuellen Zustand', () => {
    const vm = createTodoViewModel(sequentialIds())
    const keepAlive = vm.todos$.subscribe()
    vm.add('A')

    const late: Todo[][] = []
    vm.todos$.subscribe((todos) => late.push(todos))
    expect(late).toEqual([[{ id: '1', title: 'A', done: false }]])
    keepAlive.unsubscribe()
  })

  test('recentSearches$ hält die letzten fünf Suchen als LRU', () => {
    const vm = createTodoViewModel(sequentialIds())
    const lists: string[][] = []
    vm.recentSearches$.subscribe((list) => lists.push(list))

    for (const term of ['rxjs', 'scan', 'zip', 'share', 'retry', 'debounce', 'scan']) vm.search(term)

    expect(lists[0]).toEqual([])
    expect(latest(lists)).toEqual(['scan', 'debounce', 'retry', 'share', 'zip'])
  })
})
