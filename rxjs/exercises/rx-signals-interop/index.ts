/**
 * Lesson rx-signals-interop: Signals or Observables?
 *
 * Task: Build a view model for the workshop shop. The cart and its
 * total are state with a current value, so Signals. The product search
 * needs time and cancellation, so it runs as an Observable with debounceTime and
 * switchMap. The result goes back to the view as a Signal with an initial value.
 *
 * Instead of a framework you use the small Signal from signal.ts and build the
 * two bridges yourself that Angular ships in @angular/core/rxjs-interop:
 * toObservable and toSignal.
 */
import { Observable } from 'rxjs'
import { type Signal } from './signal.js'

export type Product = { id: string; name: string; priceCents: number; stock: number }
export type CartItem = { productId: string; quantity: number; priceCents: number }

/** Signal -> Observable: emits the current value immediately, then every change. */
export const toObservable = <T>(source: Signal<T>): Observable<T> =>
  new Observable<T>((subscriber) => {
    // TODO: send the current value via source.get(), register source.watch(...), unregister on teardown
    subscriber.error(new Error('TODO: toObservable'))
  })

/** Observable -> Signal: the Signal always holds the last value, until unsubscribe. */
export const toSignal = <T>(source$: Observable<T>, initialValue: T): { value: Signal<T>; unsubscribe: () => void } => {
  // TODO: create signal(initialValue), subscribe to source$ and write via set
  throw new Error('TODO: toSignal')
}

export type ShopViewModel = {
  /** Cart as a Signal */
  cart: Signal<CartItem[]>
  /** Total in cents as a Signal, follows the cart */
  totalCents: Signal<number>
  /** Puts one piece into the cart, for an existing product the quantity rises */
  add: (product: Product) => void
  remove: (productId: string) => void
  /** Input of the product search as a Signal */
  term: Signal<string>
  /** Result of the search as a Signal, the time logic in between runs as an Observable */
  results: Signal<Product[]>
  destroy: () => void
}

export const createShopViewModel = (
  searchProducts: (term: string) => Observable<Product[]>,
  debounceMs = 300,
): ShopViewModel => {
  // TODO: cart, totalCents, and term as signal
  // TODO: cart.watch(...) keeps totalCents up to date: Σ quantity × priceCents
  // TODO: results = toSignal(toObservable(term).pipe(debounceTime, distinctUntilChanged, switchMap(searchProducts)), [])
  // TODO: destroy unsubscribes results and the watch listener
  throw new Error('TODO: createShopViewModel')
}
