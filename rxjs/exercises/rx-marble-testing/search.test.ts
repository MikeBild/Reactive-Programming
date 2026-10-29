/**
 * Lektion rx-marble-testing: Zeit testen ohne zu warten
 *
 * Aufgabe: Teste interval(1000).pipe(take(5)) ohne Mocks mit TestScheduler
 * und schreib danach Marble Tests für die Produktsuche in search.ts mit
 * debounceTime, switchMap und catchError.
 *
 * Diese Übung läuft mit node:test und node:assert, ohne Test-Framework:
 *
 *   npm run test:marble
 *   node --test --watch exercises/rx-marble-testing/search.test.ts
 *
 * Mach aus jedem test.todo einen echten Test. Die Lösung liegt in
 * solution/search.test.ts, schau erst rein, wenn du festhängst.
 */
import { deepStrictEqual } from 'node:assert/strict'
import { describe, test } from 'node:test'
import { TestScheduler } from 'rxjs/testing'
// import { interval, take } from 'rxjs'
// import { searchResults } from './search.ts'

// Starte mit diesem Helfer, er vergleicht per deepStrictEqual aus node:assert.
const createScheduler = () => new TestScheduler((actual, expected) => deepStrictEqual(actual, expected))

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
