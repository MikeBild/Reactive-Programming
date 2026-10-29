import { describe, expect, test } from 'vitest'
import { createCartViewModel, pushRecent, reduceCart, totalCents, type CartItem, type Product } from './index.js'

const bremsscheibe: Product = { id: 'p-1', name: 'Bremsscheibe', priceCents: 4_990, stock: 10 }
const zuendkerze: Product = { id: 'p-2', name: 'Zündkerze', priceCents: 799, stock: 50 }

const latest = <T>(values: T[]) => values[values.length - 1]

describe('rx-ui-state: Reducer', () => {
  test('add und remove ändern den Warenkorb, ohne ihn zu mutieren', () => {
    const empty: CartItem[] = []
    const one = reduceCart(empty, { type: 'add', item: { productId: 'p-1', quantity: 1, priceCents: 4_990 } })
    const two = reduceCart(one, { type: 'add', item: { productId: 'p-2', quantity: 4, priceCents: 799 } })
    const removed = reduceCart(two, { type: 'remove', productId: 'p-1' })

    expect(empty).toEqual([])
    expect(one).toEqual([{ productId: 'p-1', quantity: 1, priceCents: 4_990 }])
    expect(two).toHaveLength(2)
    expect(removed).toEqual([{ productId: 'p-2', quantity: 4, priceCents: 799 }])
  })

  test('dasselbe Produkt erhöht die quantity statt eine zweite Position anzulegen', () => {
    const item = { productId: 'p-1', quantity: 1, priceCents: 4_990 }
    const once = reduceCart([], { type: 'add', item })
    const twice = reduceCart(once, { type: 'add', item: { ...item, quantity: 2 } })

    expect(twice).toEqual([{ productId: 'p-1', quantity: 3, priceCents: 4_990 }])
    expect(once[0]?.quantity).toBe(1)
  })

  test('totalCents summiert quantity × priceCents in ganzen Cent', () => {
    expect(totalCents([])).toBe(0)
    expect(
      totalCents([
        { productId: 'p-1', quantity: 2, priceCents: 4_990 },
        { productId: 'p-2', quantity: 4, priceCents: 799 },
      ]),
    ).toBe(13_176)
  })

  test('LRU: neueste Suche vorn, Duplikate wandern nach vorn, maximal fünf', () => {
    const push = pushRecent(5)
    const recent = ['a', 'b', 'c', 'd', 'e', 'f', 'c', ' ', 'g'].reduce(push, [])
    expect(recent).toEqual(['g', 'c', 'f', 'e', 'd'])
  })
})

describe('rx-ui-state: View Model', () => {
  test('cart$ startet leer und folgt den Aktionen', () => {
    const vm = createCartViewModel()
    const states: CartItem[][] = []
    vm.cart$.subscribe((cart) => states.push(cart))

    vm.add(bremsscheibe)
    vm.add(zuendkerze, 4)
    vm.add(bremsscheibe)
    vm.remove('p-2')

    expect(states[0]).toEqual([])
    expect(latest(states)).toEqual([{ productId: 'p-1', quantity: 2, priceCents: 4_990 }])
  })

  test('totalCents$ meldet nur echte Änderungen', () => {
    const vm = createCartViewModel()
    const totals: number[] = []
    vm.totalCents$.subscribe((total) => totals.push(total))

    vm.add(zuendkerze)
    vm.add(bremsscheibe)
    vm.remove('p-99') // gibt es nicht, die Summe bleibt gleich

    expect(totals).toEqual([0, 799, 5_789])
  })

  test('canPlace$ ist nur mit Positionen und ohne laufende Bestellung true', () => {
    const vm = createCartViewModel()
    const values: boolean[] = []
    vm.canPlace$.subscribe((value) => values.push(value))

    vm.add(bremsscheibe)
    vm.setPlacing(true)
    vm.setPlacing(false)
    vm.remove('p-1')

    expect(values).toEqual([false, true, false, true, false])
  })

  test('späte Subscriber bekommen sofort den aktuellen Warenkorb', () => {
    const vm = createCartViewModel()
    const keepAlive = vm.cart$.subscribe()
    vm.add(zuendkerze)

    const late: CartItem[][] = []
    vm.cart$.subscribe((cart) => late.push(cart))
    expect(late).toEqual([[{ productId: 'p-2', quantity: 1, priceCents: 799 }]])
    keepAlive.unsubscribe()
  })

  test('recentSearches$ hält die letzten fünf Produktsuchen als LRU', () => {
    const vm = createCartViewModel()
    const lists: string[][] = []
    vm.recentSearches$.subscribe((list) => lists.push(list))

    for (const term of ['bremse', 'kerze', 'öl', 'filter', 'reifen', 'kette', 'kerze']) vm.search(term)

    expect(lists[0]).toEqual([])
    expect(latest(lists)).toEqual(['kerze', 'kette', 'reifen', 'filter', 'öl'])
  })
})
