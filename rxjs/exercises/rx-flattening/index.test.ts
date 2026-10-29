import { TestScheduler } from 'rxjs/testing'
import { describe, expect, test } from 'vitest'
import { autosave, loginOnClick, searchResults, uploadQueue } from './index.js'

const createScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected))

describe('rx-flattening', () => {
  test('Suche: ein neuer Begriff bricht die laufende Suche ab', () => {
    createScheduler().run(({ hot, cold, expectObservable }) => {
      const term$ = hot('-a-b-------|')
      const search = (term: string) => cold('---r|', { r: [term] })
      // a startet in Frame 1, b in Frame 3 bricht a ab, Ergebnis für b in Frame 6
      expectObservable(searchResults(term$, search)).toBe('------x----|', { x: ['b'] })
    })
  })

  test('Autosave: speichert alle Änderungen nacheinander in ihrer Reihenfolge', () => {
    createScheduler().run(({ hot, cold, expectObservable, expectSubscriptions }) => {
      const change$ = hot('-ab-------|')
      const saves = { a: cold('---A|'), b: cold('-B|') }
      const save = (change: string) => (change === 'a' ? saves.a : saves.b)
      expectObservable(autosave(change$, save)).toBe('----A-B---|')
      expectSubscriptions(saves.a.subscriptions).toBe('-^---!')
      expectSubscriptions(saves.b.subscriptions).toBe('-----^-!')
    })
  })

  test('Upload-Queue: höchstens zwei Uploads laufen gleichzeitig', () => {
    createScheduler().run(({ hot, cold, expectObservable }) => {
      const file$ = hot('-abc|')
      const upload = (file: string) => cold('----u|', { u: `${file} ok` })
      // a und b starten sofort, c erst, wenn a fertig ist
      expectObservable(uploadQueue(file$, upload, 2)).toBe('-----xy---z|', {
        x: 'a ok',
        y: 'b ok',
        z: 'c ok',
      })
    })
  })

  test('Login: Klicks während eines laufenden Logins werden ignoriert', () => {
    createScheduler().run(({ hot, cold, expectObservable }) => {
      const click$ = hot('-aa-a-----a--|')
      let calls = 0
      const login = () => {
        calls++
        return cold('---s|', { s: `session ${calls}` })
      }
      expectObservable(loginOnClick(click$, login)).toBe('----x--------y|', {
        x: 'session 1',
        y: 'session 2',
      })
    })
  })
})
