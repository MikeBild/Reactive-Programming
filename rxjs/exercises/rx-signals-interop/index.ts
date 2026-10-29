/**
 * Lektion rx-signals-interop: Signals oder Observables?
 *
 * Aufgabe: Bau ein View Model für den Werkstatt-Shop. Der Warenkorb und seine
 * Gesamtsumme sind Zustand mit aktuellem Wert, also Signals. Die Produktsuche
 * braucht Zeit und Abbruch, also läuft sie als Observable mit debounceTime und
 * switchMap. Das Ergebnis geht als Signal mit Startwert zurück an die Ansicht.
 *
 * Statt eines Frameworks nutzt du das kleine Signal aus signal.ts und baust die
 * beiden Brücken selbst, die Angular in @angular/core/rxjs-interop mitbringt:
 * toObservable und toSignal.
 */
import { Observable } from 'rxjs'
import { type Signal } from './signal.js'

export type Product = { id: string; name: string; priceCents: number; stock: number }
export type CartItem = { productId: string; quantity: number; priceCents: number }

/** Signal -> Observable: liefert sofort den aktuellen Wert, danach jede Änderung. */
export const toObservable = <T>(source: Signal<T>): Observable<T> =>
  new Observable<T>((subscriber) => {
    // TODO: aktuellen Wert per source.get() senden, source.watch(...) anmelden, beim Teardown abmelden
    subscriber.error(new Error('TODO: toObservable'))
  })

/** Observable -> Signal: das Signal hält immer den letzten Wert, bis unsubscribe. */
export const toSignal = <T>(source$: Observable<T>, initialValue: T): { value: Signal<T>; unsubscribe: () => void } => {
  // TODO: signal(initialValue) anlegen, source$ abonnieren und per set schreiben
  throw new Error('TODO: toSignal')
}

export type ShopViewModel = {
  /** Warenkorb als Signal */
  cart: Signal<CartItem[]>
  /** Gesamtsumme in Cent als Signal, folgt dem Warenkorb */
  totalCents: Signal<number>
  /** Legt ein Stück in den Warenkorb, bei vorhandenem Produkt steigt die quantity */
  add: (product: Product) => void
  remove: (productId: string) => void
  /** Eingabe der Produktsuche als Signal */
  term: Signal<string>
  /** Ergebnis der Suche als Signal, die Zeitlogik dazwischen läuft als Observable */
  results: Signal<Product[]>
  destroy: () => void
}

export const createShopViewModel = (
  searchProducts: (term: string) => Observable<Product[]>,
  debounceMs = 300,
): ShopViewModel => {
  // TODO: cart, totalCents und term als signal
  // TODO: cart.watch(...) hält totalCents aktuell: Σ quantity × priceCents
  // TODO: results = toSignal(toObservable(term).pipe(debounceTime, distinctUntilChanged, switchMap(searchProducts)), [])
  // TODO: destroy meldet results und den watch-Listener ab
  throw new Error('TODO: createShopViewModel')
}
