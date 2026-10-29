import { Subject } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { describe, expect, test } from 'vitest'
import { signal } from './signal.js'
import { createTodoSearchViewModel, toObservable, toSignal, type Todo } from './index.js'

const createScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected))

const learnRx: Todo = { id: '1', title: 'rxjs lernen', done: false }
const learnSignals: Todo = { id: '2', title: 'signals lernen', done: false }
const practiceRx: Todo = { id: '3', title: 'rxjs üben', done: true }
const all = [learnRx, learnSignals, practiceRx]

describe('rx-signals-interop: Brücken', () => {
  test('toObservable liefert den aktuellen Wert und danach jede Änderung', () => {
    const count = signal(1)
    const seen: number[] = []
    const subscription = toObservable(count).subscribe((value) => seen.push(value))

    count.set(2)
    count.set(2)
    count.update((n) => n + 1)
    subscription.unsubscribe()
    count.set(99)

    expect(seen).toEqual([1, 2, 3])
  })

  test('toSignal hält den letzten Wert, bis du dich abmeldest', () => {
    const prices = new Subject<number>()
    const price = toSignal(prices, 0)

    expect(price.value()).toBe(0)
    prices.next(42)
    expect(price.value()).toBe(42)

    price.unsubscribe()
    prices.next(7)
    expect(price.value()).toBe(42)
    expect(prices.observed).toBe(false)
  })
})

describe('rx-signals-interop: View Model', () => {
  test('der Zustand ist ein Signal und synchron lesbar', () => {
    const vm = createTodoSearchViewModel(() => new Subject<Todo[]>())
    vm.add('1', 'rxjs lernen')
    vm.toggle('1')
    expect(vm.todos()).toEqual([{ id: '1', title: 'rxjs lernen', done: true }])
    vm.destroy()
  })

  test('die Suche wartet die Ruhe ab und sucht nur den letzten Begriff', () => {
    const searched: string[] = []
    createScheduler().run(({ cold, expectObservable }) => {
      const search = (term: string) => {
        searched.push(term)
        return cold('-r|', { r: all.filter((todo) => todo.title.includes(term)) })
      }
      const vm = createTodoSearchViewModel(search)

      // Tippen: r in 100, rx in 150, danach Ruhe
      cold('100ms a 49ms b', { a: 'r', b: 'rx' }).subscribe((term) => vm.term.set(term))

      // Startwert [] in Frame 0, debounce bis 450, Ergebnis einen Frame später
      expectObservable(toObservable(vm.results), '^ 600ms !').toBe('i 450ms x', {
        i: [],
        x: [learnRx, practiceRx],
      })
    })
    expect(searched).toEqual(['rx'])
  })

  test('ein neuer Begriff bricht die laufende Suche ab', () => {
    createScheduler().run(({ cold, expectObservable, expectSubscriptions }) => {
      const slow = cold<Todo[]>('1s r|', { r: [] })
      const fast = cold('-r|', { r: [learnSignals] })
      const vm = createTodoSearchViewModel((term) => (term === 'rx' ? slow : fast))

      cold('a 400ms b', { a: 'rx', b: 'signals' }).subscribe((term) => vm.term.set(term))

      expectObservable(toObservable(vm.results), '^ 1000ms !').toBe('i 701ms x', { i: [], x: [learnSignals] })
      expectSubscriptions(slow.subscriptions).toBe('300ms ^ 400ms !')
    })
  })
})
