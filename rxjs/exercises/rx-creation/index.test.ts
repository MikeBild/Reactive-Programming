import { firstValueFrom, take, toArray } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { describe, expect, test } from 'vitest'
import { clicks$, log$, ticks$, user$, withPrefix } from './index.js'

const createScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected))

describe('rx-creation', () => {
  test('clicks$ liefert jeden Klick auf den Button', () => {
    const button = new EventTarget()
    const types: string[] = []
    const subscription = clicks$(button).subscribe((event) => types.push(event.type))

    button.dispatchEvent(new Event('click'))
    button.dispatchEvent(new Event('click'))
    subscription.unsubscribe()
    button.dispatchEvent(new Event('click'))

    expect(types).toEqual(['click', 'click'])
  })

  test('ticks$ zählt im Takt hoch', () => {
    createScheduler().run(({ expectObservable }) => {
      expectObservable(ticks$(100).pipe(take(3))).toBe('100ms a 99ms b 99ms (c|)', { a: 0, b: 1, c: 2 })
    })
  })

  test('user$ ruft loadUser erst beim subscribe auf, für jeden Subscriber neu', async () => {
    let calls = 0
    const loadUser = async () => ({ id: String(++calls), name: 'Ada' })
    const source$ = user$(loadUser)

    expect(calls).toBe(0)
    await expect(firstValueFrom(source$)).resolves.toEqual({ id: '1', name: 'Ada' })
    await expect(firstValueFrom(source$)).resolves.toEqual({ id: '2', name: 'Ada' })
    expect(calls).toBe(2)
  })

  test('withPrefix setzt den Präfix vor jeden Wert', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      expectObservable(withPrefix('tick', cold('a-b|', { a: 1, b: 2 }))).toBe('a-b|', {
        a: 'tick: 1',
        b: 'tick: 2',
      })
    })
  })

  test('log$ führt Klicks, Ticks und User in einem Stream zusammen', async () => {
    const button = new EventTarget()
    const lines = firstValueFrom(log$(button, 20, async () => ({ id: '42', name: 'Ada' })).pipe(take(4), toArray()))

    button.dispatchEvent(new Event('click'))

    expect(await lines).toEqual(['click: click', 'user: Ada', 'tick: 0', 'tick: 1'])
  })
})
