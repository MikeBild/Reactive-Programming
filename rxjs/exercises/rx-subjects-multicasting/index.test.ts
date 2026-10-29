import { describe, expect, test } from 'vitest'
import { FakeSocketServer } from './fake-socket.js'
import { CartStore, connectSocket, sharedSocket } from './index.js'

describe('rx-subjects-multicasting', () => {
  test('connectSocket öffnet erst beim subscribe und schließt beim unsubscribe', () => {
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

  test('ohne share öffnet jeder Subscriber eine eigene Verbindung', () => {
    const server = new FakeSocketServer()
    const socket$ = connectSocket(server)
    socket$.subscribe()
    socket$.subscribe()
    expect(server.openConnections).toBe(2)
  })

  test('der Letzte macht das Licht aus', () => {
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

  test('nach dem Licht-aus öffnet der nächste Subscriber eine neue Verbindung', () => {
    const server = new FakeSocketServer()
    const socket$ = sharedSocket(server)

    socket$.subscribe().unsubscribe()
    socket$.subscribe()

    expect(server.opened).toBe(2)
    expect(server.openConnections).toBe(1)
  })

  test('CartStore liefert späten Subscribern sofort den aktuellen Warenkorb', () => {
    const cart = new CartStore()
    cart.add('Buch')
    cart.add('Stift')

    const seen: string[][] = []
    cart.items$.subscribe((items) => seen.push(items))
    cart.add('Heft')

    expect(seen).toEqual([['Buch', 'Stift'], ['Buch', 'Stift', 'Heft']])
    expect(cart.current).toEqual(['Buch', 'Stift', 'Heft'])
  })

  test('CartStore gibt nach außen kein Subject heraus', () => {
    const cart = new CartStore()
    expect('next' in cart.items$).toBe(false)
  })
})
