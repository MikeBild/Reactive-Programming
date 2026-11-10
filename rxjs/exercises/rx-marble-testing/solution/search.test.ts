import { deepStrictEqual } from 'node:assert/strict'
import { describe, test } from 'node:test'
import { interval, take } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { searchResults } from '../search.ts'

const createScheduler = () => new TestScheduler((actual, expected) => deepStrictEqual(actual, expected))

describe('rx-marble-testing (reference solution)', () => {
  test('interval(1000).pipe(take(5)) emits five values once per second and completes', () => {
    createScheduler().run(({ expectObservable }) => {
      const ticks$ = interval(1_000).pipe(take(5))
      expectObservable(ticks$).toBe('1s a 999ms b 999ms c 999ms d 999ms (e|)', { a: 0, b: 1, c: 2, d: 3, e: 4 })
    })
  })

  test('the search waits for 300 ms of silence and only searches for the last term', () => {
    const searched: string[] = []
    createScheduler().run(({ hot, cold, expectObservable }) => {
      // a and b arrive right after each other, after b there is 300 ms of silence
      const term$ = hot('-ab', { a: 'B', b: 'Brems' })
      const search = (term: string) => {
        searched.push(term)
        return cold('-r|', { r: [`${term}scheibe`] })
      }
      // b in frame 2, debounce until 302, result one frame later
      expectObservable(searchResults(term$, search)).toBe('303ms x', {
        x: { kind: 'ok', term: 'Brems', results: ['Bremsscheibe'] },
      })
    })
    // run() plays the virtual time at the end, after that the search has run
    deepStrictEqual(searched, ['Brems'])
  })

  test('the same term twice in a row does not trigger a second search', () => {
    createScheduler().run(({ hot, cold, expectObservable }) => {
      const term$ = hot('a 400ms a', { a: 'Kerze' })
      const search = (term: string) => cold('-r|', { r: [term] })
      expectObservable(searchResults(term$, search)).toBe('301ms x', {
        x: { kind: 'ok', term: 'Kerze', results: ['Kerze'] },
      })
    })
  })

  test('a new term cancels the running search', () => {
    createScheduler().run(({ hot, cold, expectObservable, expectSubscriptions }) => {
      const term$ = hot('a 400ms b', { a: 'Brems', b: 'Zünd' })
      const slow = cold('500ms r|', { r: ['Bremsscheibe'] })
      const fast = cold('-r|', { r: ['Zündkerze'] })
      const search = (term: string) => (term === 'Brems' ? slow : fast)

      // a: debounce until 300, search starts. b in 401, debounce until 701, a is canceled.
      expectObservable(searchResults(term$, search)).toBe('702ms x', {
        x: { kind: 'ok', term: 'Zünd', results: ['Zündkerze'] },
      })
      expectSubscriptions(slow.subscriptions).toBe('300ms ^ 400ms !')
    })
  })

  test('a search error becomes the error state, the next search keeps running', () => {
    createScheduler().run(({ hot, cold, expectObservable }) => {
      const term$ = hot('a 400ms b', { a: 'kaputt', b: 'Kerze' })
      const search = (term: string) =>
        term === 'kaputt' ? cold<string[]>('-#', {}, new Error('500')) : cold('-r|', { r: [term] })

      expectObservable(searchResults(term$, search)).toBe('301ms e 400ms x', {
        e: { kind: 'error', term: 'kaputt' },
        x: { kind: 'ok', term: 'Kerze', results: ['Kerze'] },
      })
    })
  })
})
