import { deepStrictEqual } from 'node:assert/strict'
import { describe, test } from 'node:test'
import { interval, take } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { searchResults } from '../search.ts'

const createScheduler = () => new TestScheduler((actual, expected) => deepStrictEqual(actual, expected))

describe('rx-marble-testing (Lösung)', () => {
  test('interval(1000).pipe(take(5)) liefert fünf Werte im Sekundentakt und complete', () => {
    createScheduler().run(({ expectObservable }) => {
      const ticks$ = interval(1_000).pipe(take(5))
      expectObservable(ticks$).toBe('1s a 999ms b 999ms c 999ms d 999ms (e|)', { a: 0, b: 1, c: 2, d: 3, e: 4 })
    })
  })

  test('die Suche wartet 300 ms Ruhe ab und sucht nur den letzten Begriff', () => {
    const searched: string[] = []
    createScheduler().run(({ hot, cold, expectObservable }) => {
      // a und b kommen direkt nacheinander, nach b ist 300 ms Ruhe
      const term$ = hot('-ab', { a: 'B', b: 'Brems' })
      const search = (term: string) => {
        searched.push(term)
        return cold('-r|', { r: [`${term}scheibe`] })
      }
      // b in Frame 2, debounce bis 302, Ergebnis einen Frame später
      expectObservable(searchResults(term$, search)).toBe('303ms x', {
        x: { kind: 'ok', term: 'Brems', results: ['Bremsscheibe'] },
      })
    })
    // run() spielt die virtuelle Zeit am Ende ab, danach ist die Suche gelaufen
    deepStrictEqual(searched, ['Brems'])
  })

  test('derselbe Begriff zweimal hintereinander löst keine zweite Suche aus', () => {
    createScheduler().run(({ hot, cold, expectObservable }) => {
      const term$ = hot('a 400ms a', { a: 'Kerze' })
      const search = (term: string) => cold('-r|', { r: [term] })
      expectObservable(searchResults(term$, search)).toBe('301ms x', {
        x: { kind: 'ok', term: 'Kerze', results: ['Kerze'] },
      })
    })
  })

  test('ein neuer Begriff bricht die laufende Suche ab', () => {
    createScheduler().run(({ hot, cold, expectObservable, expectSubscriptions }) => {
      const term$ = hot('a 400ms b', { a: 'Brems', b: 'Zünd' })
      const slow = cold('500ms r|', { r: ['Bremsscheibe'] })
      const fast = cold('-r|', { r: ['Zündkerze'] })
      const search = (term: string) => (term === 'Brems' ? slow : fast)

      // a: debounce bis 300, Suche startet. b in 401, debounce bis 701, a wird abgebrochen.
      expectObservable(searchResults(term$, search)).toBe('702ms x', {
        x: { kind: 'ok', term: 'Zünd', results: ['Zündkerze'] },
      })
      expectSubscriptions(slow.subscriptions).toBe('300ms ^ 400ms !')
    })
  })

  test('ein Fehler der Suche wird zum Fehlerzustand, die nächste Suche läuft weiter', () => {
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
