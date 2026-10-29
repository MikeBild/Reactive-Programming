import { Subject } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { describe, expect, test } from 'vitest'
import { signal } from './signal.js'
import { createShopViewModel, toObservable, toSignal, type Product } from './index.js'

const createScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected))

const bremsscheibe: Product = { id: 'p-1', name: 'Bremsscheibe', priceCents: 4_990, stock: 10 }
const bremsbelag: Product = { id: 'p-2', name: 'Bremsbelag', priceCents: 2_490, stock: 25 }
const zuendkerze: Product = { id: 'p-3', name: 'Zündkerze', priceCents: 799, stock: 50 }
const catalog = [bremsscheibe, bremsbelag, zuendkerze]

describe('rx-signals-interop: Brücken', () => {
  test('toObservable liefert den aktuellen Wert und danach jede Änderung', () => {
    const count = signal(1)
    const seen: number[] = []
    const subscription = toObservable(count).subscribe((value) => seen.push(value))

    count.set(2)
    count.set(2)
    count.set(count.get() + 1)
    subscription.unsubscribe()
    count.set(99)

    expect(seen).toEqual([1, 2, 3])
  })

  test('toSignal hält den letzten Wert, bis du dich abmeldest', () => {
    const prices = new Subject<number>()
    const price = toSignal(prices, 0)

    expect(price.value.get()).toBe(0)
    prices.next(4_990)
    expect(price.value.get()).toBe(4_990)

    price.unsubscribe()
    prices.next(799)
    expect(price.value.get()).toBe(4_990)
    expect(prices.observed).toBe(false)
  })
})

describe('rx-signals-interop: View Model', () => {
  test('Warenkorb und Gesamtsumme sind Signals und synchron lesbar', () => {
    const vm = createShopViewModel(() => new Subject<Product[]>())
    expect(vm.totalCents.get()).toBe(0)

    vm.add(bremsscheibe)
    vm.add(zuendkerze)
    vm.add(zuendkerze)
    expect(vm.cart.get()).toEqual([
      { productId: 'p-1', quantity: 1, priceCents: 4_990 },
      { productId: 'p-3', quantity: 2, priceCents: 799 },
    ])
    expect(vm.totalCents.get()).toBe(6_588)

    vm.remove('p-1')
    expect(vm.totalCents.get()).toBe(1_598)
    vm.destroy()
  })

  test('die Produktsuche wartet die Ruhe ab und sucht nur den letzten Begriff', () => {
    const searched: string[] = []
    createScheduler().run(({ cold, expectObservable }) => {
      const searchProducts = (term: string) => {
        searched.push(term)
        return cold('-r|', { r: catalog.filter((product) => product.name.startsWith(term)) })
      }
      const vm = createShopViewModel(searchProducts)

      // Tippen: B in 100, Brems in 150, danach Ruhe
      cold('100ms a 49ms b', { a: 'B', b: 'Brems' }).subscribe((term) => vm.term.set(term))

      // Startwert [] in Frame 0, debounce bis 450, Ergebnis einen Frame später
      expectObservable(toObservable(vm.results), '^ 600ms !').toBe('i 450ms x', {
        i: [],
        x: [bremsscheibe, bremsbelag],
      })
    })
    expect(searched).toEqual(['Brems'])
  })

  test('ein neuer Begriff bricht die laufende Suche ab', () => {
    createScheduler().run(({ cold, expectObservable, expectSubscriptions }) => {
      const slow = cold<Product[]>('1s r|', { r: [] })
      const fast = cold('-r|', { r: [zuendkerze] })
      const vm = createShopViewModel((term) => (term === 'Brems' ? slow : fast))

      cold('a 400ms b', { a: 'Brems', b: 'Zünd' }).subscribe((term) => vm.term.set(term))

      expectObservable(toObservable(vm.results), '^ 1000ms !').toBe('i 701ms x', { i: [], x: [zuendkerze] })
      expectSubscriptions(slow.subscriptions).toBe('300ms ^ 400ms !')
    })
  })
})
