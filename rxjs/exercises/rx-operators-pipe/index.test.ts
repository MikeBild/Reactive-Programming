import { TestScheduler } from 'rxjs/testing'
import { describe, expect, test } from 'vitest'
import { countOfType, ofType, type Message } from './index.js'

const createScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected))

type Order = { total: number }

const messages: Record<string, Message> = {
  a: { type: 'order-placed', id: '1', payload: { total: 10 } },
  d: { type: 'order-placed', id: '1', payload: { total: 10 } }, // duplicate of a
  b: { type: 'user-joined', id: '2', payload: { name: 'Ada' } },
  c: { type: 'order-placed', id: '3', payload: { total: 25 } },
  e: { type: 'user-joined', id: '4', payload: { name: 'Grace' } },
}

describe('rx-operators-pipe', () => {
  test('ofType filters by type and emits the payload', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const messages$ = cold<Message>('a-b-c|', messages)
      expectObservable(messages$.pipe(ofType<Order>('order-placed'))).toBe('a---c|', {
        a: { total: 10 },
        c: { total: 25 },
      })
    })
  })

  test('ofType drops directly repeated messages', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const messages$ = cold<Message>('a-d-c|', messages)
      expectObservable(messages$.pipe(ofType<Order>('order-placed'))).toBe('a---c|', {
        a: { total: 10 },
        c: { total: 25 },
      })
    })
  })

  test('a duplicate still does not count when a foreign message lies in between', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const messages$ = cold<Message>('a-b-d-c|', messages)
      expectObservable(messages$.pipe(countOfType('order-placed'))).toBe('a-----c|', { a: 1, c: 2 })
    })
  })

  test('countOfType emits the running count after every message', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const messages$ = cold<Message>('a-b-c-e|', messages)
      expectObservable(messages$.pipe(countOfType('user-joined'))).toBe('--x---y|', { x: 1, y: 2 })
    })
  })

  test('the source stays unchanged, every operator returns a new Observable', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const messages$ = cold<Message>('a-b|', messages)
      const counted$ = messages$.pipe(countOfType('order-placed'))
      expect(counted$).not.toBe(messages$)
      expectObservable(messages$).toBe('a-b|', messages)
    })
  })
})
