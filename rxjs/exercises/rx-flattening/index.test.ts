import { TestScheduler } from 'rxjs/testing'
import { describe, expect, test } from 'vitest'
import { autosave, loginOnClick, searchResults, uploadQueue } from './index.js'

const createScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected))

describe('rx-flattening', () => {
  test('search: a new term cancels the running search', () => {
    createScheduler().run(({ hot, cold, expectObservable }) => {
      const term$ = hot('-a-b-------|')
      const search = (term: string) => cold('---r|', { r: [term] })
      // a starts in frame 1, b in frame 3 cancels a, result for b in frame 6
      expectObservable(searchResults(term$, search)).toBe('------x----|', { x: ['b'] })
    })
  })

  test('autosave: saves all changes one after another in their order', () => {
    createScheduler().run(({ hot, cold, expectObservable, expectSubscriptions }) => {
      const change$ = hot('-ab-------|')
      const saves = { a: cold('---A|'), b: cold('-B|') }
      const save = (change: string) => (change === 'a' ? saves.a : saves.b)
      expectObservable(autosave(change$, save)).toBe('----A-B---|')
      expectSubscriptions(saves.a.subscriptions).toBe('-^---!')
      expectSubscriptions(saves.b.subscriptions).toBe('-----^-!')
    })
  })

  test('upload queue: at most two uploads run at the same time', () => {
    createScheduler().run(({ hot, cold, expectObservable }) => {
      const file$ = hot('-abc|')
      const upload = (file: string) => cold('----u|', { u: `${file} ok` })
      // a and b start immediately, c only when a is done
      expectObservable(uploadQueue(file$, upload, 2)).toBe('-----xy---z|', {
        x: 'a ok',
        y: 'b ok',
        z: 'c ok',
      })
    })
  })

  test('login: clicks during a running login are ignored', () => {
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
