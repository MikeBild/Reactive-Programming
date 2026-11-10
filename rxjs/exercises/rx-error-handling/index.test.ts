import { defer, type Observable } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { describe, expect, test } from 'vitest'
import { loadAll } from './index.js'

const createScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected))

describe('rx-error-handling', () => {
  test('a successful request yields an ok value', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const fetchJson = () => cold('-v|', { v: 42 })
      expectObservable(loadAll(['/a'], fetchJson)).toBe('-a|', { a: { kind: 'ok', url: '/a', value: 42 } })
    })
  })

  test('an error is retried after 500 ms backoff', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      let attempts = 0
      const fetchJson = () =>
        defer(() => (++attempts === 1 ? cold<number>('-#', {}, new Error('503')) : cold('-v|', { v: 7 })))
      // error in frame 1, retry after 500 ms in frame 501, value in frame 502, complete in 503
      expectObservable(loadAll(['/flaky'], fetchJson)).toBe('502ms a|', {
        a: { kind: 'ok', url: '/flaky', value: 7 },
      })
    })
  })

  test('after two failed retries an error value arrives instead of an error', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const fetchJson = () => cold<number>('-#', {}, new Error('503'))
      // attempt 1 fails in frame 1, attempt 2 in 502, attempt 3 in 1503
      expectObservable(loadAll(['/down'], fetchJson)).toBe('1503ms (e|)', {
        e: { kind: 'error', url: '/down', message: '503' },
      })
    })
  })

  test('every attempt has a timeout of two seconds', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const fetchJson = (): Observable<number> => cold('-')
      // 2000 timeout, 500 pause, 2000 timeout, 1000 pause, 2000 timeout
      expectObservable(loadAll(['/slow'], fetchJson)).toBe('7500ms (e|)', {
        e: { kind: 'error', url: '/slow', message: 'Timeout has occurred' },
      })
    })
  })

  test('three URLs run in parallel and one error does not cancel the others', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      let flakyAttempts = 0
      const fetchJson = (url: string): Observable<number> =>
        url === '/ok'
          ? cold('-v|', { v: 1 })
          : url === '/flaky'
            ? defer(() => (++flakyAttempts === 1 ? cold<number>('-#', {}, new Error('503')) : cold('-v|', { v: 2 })))
            : cold('-')

      expectObservable(loadAll(['/ok', '/flaky', '/slow'], fetchJson)).toBe('-a 500ms b 6997ms (c|)', {
        a: { kind: 'ok', url: '/ok', value: 1 },
        b: { kind: 'ok', url: '/flaky', value: 2 },
        c: { kind: 'error', url: '/slow', message: 'Timeout has occurred' },
      })
    })
  })
})
