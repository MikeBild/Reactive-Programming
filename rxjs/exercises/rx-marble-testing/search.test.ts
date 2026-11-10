/**
 * Lesson rx-marble-testing: Testing time without waiting
 *
 * Task: Test interval(1000).pipe(take(5)) without mocks using TestScheduler,
 * then write marble tests for the product search in search.ts with
 * debounceTime, switchMap, and catchError.
 *
 * This exercise runs with node:test and node:assert, without a test framework:
 *
 *   npm run test:marble
 *   node --test --watch exercises/rx-marble-testing/search.test.ts
 *
 * Turn every test.todo into a real test. The reference solution is in
 * solution/search.test.ts, only look there when you get stuck.
 */
import { deepStrictEqual } from 'node:assert/strict'
import { describe, test } from 'node:test'
import { TestScheduler } from 'rxjs/testing'
// import { interval, take } from 'rxjs'
// import { searchResults } from './search.ts'

// Start with this helper, it compares via deepStrictEqual from node:assert.
const createScheduler = () => new TestScheduler((actual, expected) => deepStrictEqual(actual, expected))

describe('rx-marble-testing', () => {
  test('the TestScheduler is ready', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      expectObservable(cold('a|')).toBe('a|')
    })
  })

  test.todo('interval(1000).pipe(take(5)) emits five values once per second and completes')
  test.todo('the search waits for 300 ms of silence and only searches for the last term')
  test.todo('the same term twice in a row does not trigger a second search')
  test.todo('a new term cancels the running search (expectSubscriptions)')
  test.todo('a search error becomes the error state, the next search keeps running')
})
