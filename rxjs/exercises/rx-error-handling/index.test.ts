import { defer, type Observable } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { describe, expect, test } from 'vitest'
import { loadAll } from './index.js'

const createScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected))

describe('rx-error-handling', () => {
  test('ein erfolgreicher Request liefert einen ok-Wert', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const fetchJson = () => cold('-v|', { v: 42 })
      expectObservable(loadAll(['/a'], fetchJson)).toBe('-a|', { a: { kind: 'ok', url: '/a', value: 42 } })
    })
  })

  test('ein Fehler wird nach 500 ms Backoff wiederholt', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      let attempts = 0
      const fetchJson = () =>
        defer(() => (++attempts === 1 ? cold<number>('-#', {}, new Error('503')) : cold('-v|', { v: 7 })))
      // Fehler in Frame 1, Retry nach 500 ms in Frame 501, Wert in Frame 502, complete in 503
      expectObservable(loadAll(['/flaky'], fetchJson)).toBe('502ms a|', {
        a: { kind: 'ok', url: '/flaky', value: 7 },
      })
    })
  })

  test('nach zwei erfolglosen Retries kommt ein Fehlerwert statt eines error', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const fetchJson = () => cold<number>('-#', {}, new Error('503'))
      // Versuch 1 scheitert in Frame 1, Versuch 2 in 502, Versuch 3 in 1503
      expectObservable(loadAll(['/down'], fetchJson)).toBe('1503ms (e|)', {
        e: { kind: 'error', url: '/down', message: '503' },
      })
    })
  })

  test('jeder Versuch hat ein Timeout von zwei Sekunden', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const fetchJson = (): Observable<number> => cold('-')
      // 2000 Timeout, 500 Pause, 2000 Timeout, 1000 Pause, 2000 Timeout
      expectObservable(loadAll(['/slow'], fetchJson)).toBe('7500ms (e|)', {
        e: { kind: 'error', url: '/slow', message: 'Timeout has occurred' },
      })
    })
  })

  test('drei URLs laufen parallel und ein Fehler bricht die anderen nicht ab', () => {
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
