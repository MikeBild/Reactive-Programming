import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs'
import { signal, type Signal } from '../signal.js'

export type Product = { id: string; name: string; priceCents: number; stock: number }
export type CartItem = { productId: string; quantity: number; priceCents: number }

/** Signal -> Observable: liefert sofort den aktuellen Wert, danach jede Änderung. */
export const toObservable = <T>(source: Signal<T>): Observable<T> =>
  new Observable<T>((subscriber) => {
    subscriber.next(source.get())
    // watch gibt die Abmelde-Funktion zurück, sie wird zum Teardown
    return source.watch((value) => subscriber.next(value))
  })

/** Observable -> Signal: das Signal hält immer den letzten Wert, bis unsubscribe. */
export const toSignal = <T>(source$: Observable<T>, initialValue: T): { value: Signal<T>; unsubscribe: () => void } => {
  const value = signal(initialValue)
  const subscription = source$.subscribe((next) => value.set(next))
  return { value, unsubscribe: () => subscription.unsubscribe() }
}

export type ShopViewModel = {
  cart: Signal<CartItem[]>
  totalCents: Signal<number>
  add: (product: Product) => void
  remove: (productId: string) => void
  term: Signal<string>
  results: Signal<Product[]>
  destroy: () => void
}

const sumCents = (cart: CartItem[]) => cart.reduce((sum, item) => sum + item.quantity * item.priceCents, 0)

export const createShopViewModel = (
  searchProducts: (term: string) => Observable<Product[]>,
  debounceMs = 300,
): ShopViewModel => {
  // Zustand mit aktuellem Wert und ohne Zeitlogik: Signals
  const cart = signal<CartItem[]>([])
  const totalCents = signal(0)
  const stopTotal = cart.watch((items) => totalCents.set(sumCents(items)))
  const term = signal('')

  // Zeit, Abbruch und Duplikate: Observable. Das Ergebnis geht als Signal mit Startwert zurück.
  const results = toSignal(
    toObservable(term).pipe(
      debounceTime(debounceMs),
      distinctUntilChanged(),
      switchMap((value) => searchProducts(value)),
    ),
    [] as Product[],
  )

  const add = (product: Product) => {
    const items = cart.get()
    const exists = items.some((item) => item.productId === product.id)
    cart.set(
      exists
        ? items.map((item) => (item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        : [...items, { productId: product.id, quantity: 1, priceCents: product.priceCents }],
    )
  }

  return {
    cart,
    totalCents,
    add,
    remove: (productId) => cart.set(cart.get().filter((item) => item.productId !== productId)),
    term,
    results: results.value,
    destroy: () => {
      results.unsubscribe()
      stopTotal()
    },
  }
}
