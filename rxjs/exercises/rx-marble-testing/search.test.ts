/**
 * Lektion rx-marble-testing: Zeit testen ohne zu warten
 *
 * Aufgabe: Teste interval(1000).pipe(take(5)) ohne Mocks mit TestScheduler
 * und schreib danach Marble Tests für die Suche in search.ts mit debounceTime,
 * switchMap und catchError.
 *
 * Mach aus jedem test.todo einen echten Test. Die Lösung liegt in
 * solution/search.test.ts, schau erst rein, wenn du festhängst.
 */
import { TestScheduler } from 'rxjs/testing'
import { describe, expect, test } from 'vitest'

// Starte mit diesem Helfer, er vergleicht per expect aus Vitest.
const createScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected))

describe('rx-marble-testing', () => {
  test('der TestScheduler ist startklar', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      expectObservable(cold('a|')).toBe('a|')
    })
  })

  test.todo('interval(1000).pipe(take(5)) liefert fünf Werte im Sekundentakt und complete')
  test.todo('die Suche wartet 300 ms Ruhe ab und sucht nur den letzten Begriff')
  test.todo('derselbe Begriff zweimal hintereinander löst keine zweite Suche aus')
  test.todo('ein neuer Begriff bricht die laufende Suche ab (expectSubscriptions)')
  test.todo('ein Fehler der Suche wird zum Fehlerzustand, die nächste Suche läuft weiter')
})
