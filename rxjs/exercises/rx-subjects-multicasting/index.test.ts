import { describe, expect, test } from 'vitest'
import { FakeSocketServer } from './fake-socket.js'
import { CartStore, connectSocket, sharedSocket } from './index.js'

describe('rx-subjects-multicasting', () => {
  test('connectSocket only opens on subscribe and closes on unsubscribe', () => {
    const server = new FakeSocketServer()
    const socket$ = connectSocket(server)
    expect(server.opened).toBe(0)

    const received: string[] = []
    const subscription = socket$.subscribe((message) => received.push(message))
    server.broadcast('hallo')
    subscription.unsubscribe()

    expect(received).toEqual(['hallo'])
    expect(server.opened).toBe(1)
    expect(server.closed).toBe(1)
  })

  test('without share every subscriber opens its own connection', () => {
    const server = new FakeSocketServer()
    const socket$ = connectSocket(server)
    socket$.subscribe()
    socket$.subscribe()
    expect(server.openConnections).toBe(2)
  })

  test('the last one turns off the light', () => {
    const server = new FakeSocketServer()
    const socket$ = sharedSocket(server)
    const a: string[] = []
    const b: string[] = []

    const subA = socket$.subscribe((message) => a.push(message))
    expect(server.openConnections).toBe(1)

    const subB = socket$.subscribe((message) => b.push(message))
    expect(server.opened).toBe(1)

    server.broadcast('kurs 1')
    subA.unsubscribe()
    expect(server.openConnections).toBe(1)

    server.broadcast('kurs 2')
    subB.unsubscribe()
    expect(server.openConnections).toBe(0)

    expect(a).toEqual(['kurs 1'])
    expect(b).toEqual(['kurs 1', 'kurs 2'])
  })

  test('after the light is off, the next subscriber opens a new connection', () => {
    const server = new FakeSocketServer()
    const socket$ = sharedSocket(server)

    socket$.subscribe().unsubscribe()
    socket$.subscribe()

    expect(server.opened).toBe(2)
    expect(server.openConnections).toBe(1)
  })

  test('CartStore gives late subscribers the current cart immediately', () => {
    const cart = new CartStore()
    cart.add('Buch')
    cart.add('Stift')

    const seen: string[][] = []
    cart.items$.subscribe((items) => seen.push(items))
    cart.add('Heft')

    expect(seen).toEqual([['Buch', 'Stift'], ['Buch', 'Stift', 'Heft']])
    expect(cart.current).toEqual(['Buch', 'Stift', 'Heft'])
  })

  test('CartStore does not expose a Subject', () => {
    const cart = new CartStore()
    expect('next' in cart.items$).toBe(false)
  })
})
