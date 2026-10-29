import { interval, take } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { describe, expect, test } from 'vitest'
import { searchResults } from '../search.js'

const createScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected))

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
      const term$ = hot('-ab', { a: 'r', b: 'rx' })
      const search = (term: string) => {
        searched.push(term)
        return cold('-r|', { r: [`${term}js`] })
      }
      // b in Frame 2, debounce bis 302, Ergebnis einen Frame später
      expectObservable(searchResults(term$, search)).toBe('303ms x', {
        x: { kind: 'ok', term: 'rx', results: ['rxjs'] },
      })
    })
    // run() spielt die virtuelle Zeit am Ende ab, danach ist die Suche gelaufen
    expect(searched).toEqual(['rx'])
  })

  test('derselbe Begriff zweimal hintereinander löst keine zweite Suche aus', () => {
    createScheduler().run(({ hot, cold, expectObservable }) => {
      const term$ = hot('a 400ms a', { a: 'rx' })
      const search = (term: string) => cold('-r|', { r: [term] })
      expectObservable(searchResults(term$, search)).toBe('301ms x', {
        x: { kind: 'ok', term: 'rx', results: ['rx'] },
      })
    })
  })

  test('ein neuer Begriff bricht die laufende Suche ab', () => {
    createScheduler().run(({ hot, cold, expectObservable, expectSubscriptions }) => {
      const term$ = hot('a 400ms b', { a: 'langsam', b: 'schnell' })
      const slow = cold('500ms r|', { r: ['zu spät'] })
      const fast = cold('-r|', { r: ['rechtzeitig'] })
      const search = (term: string) => (term === 'langsam' ? slow : fast)

      // a: debounce bis 300, Suche startet. b in 401, debounce bis 701, a wird abgebrochen.
      expectObservable(searchResults(term$, search)).toBe('702ms x', {
        x: { kind: 'ok', term: 'schnell', results: ['rechtzeitig'] },
      })
      expectSubscriptions(slow.subscriptions).toBe('300ms ^ 400ms !')
    })
  })

  test('ein Fehler der Suche wird zum Fehlerzustand, die nächste Suche läuft weiter', () => {
    createScheduler().run(({ hot, cold, expectObservable }) => {
      const term$ = hot('a 400ms b', { a: 'kaputt', b: 'rx' })
      const search = (term: string) =>
        term === 'kaputt' ? cold<string[]>('-#', {}, new Error('500')) : cold('-r|', { r: [term] })

      expectObservable(searchResults(term$, search)).toBe('301ms e 400ms x', {
        e: { kind: 'error', term: 'kaputt' },
        x: { kind: 'ok', term: 'rx', results: ['rx'] },
      })
    })
  })
})
