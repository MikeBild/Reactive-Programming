/**
 * Lektion rx-ui-state: UI-Zustand als Stream von Aktionen
 *
 * Aufgabe: Bau das ViewModel für den Warenkorb im Werkstatt-Shop. Aktionen
 * laufen über ein Subject, scan verdichtet sie mit einem reinen Reducer zum
 * Warenkorb. Gesamtsumme und „Bestellen erlaubt?“ leitest du als eigene
 * Streams ab. Dazu hältst du die letzten fünf Produktsuchen als LRU-Liste.
 *
 * Geld rechnest du immer in ganzen Cent (priceCents), nie mit Kommazahlen.
 *
 * LRU heißt Least Recently Used: Die neueste Suche steht vorn. Kommt ein
 * Begriff erneut, wandert er nach vorn statt doppelt in der Liste zu stehen.
 * Ab sechs Einträgen fällt der älteste hinten heraus.
 *
 * Die Reducer sind reine Functions. Teste sie ohne Streams, den Rest mit scan.
 */
import { Observable } from 'rxjs'

export type Product = { id: string; name: string; priceCents: number; stock: number }
export type CartItem = { productId: string; quantity: number; priceCents: number }

export type Action = { type: 'add'; item: CartItem } | { type: 'remove'; productId: string }

/**
 * Reiner Reducer für den Warenkorb. Gibt immer einen neuen Array zurück.
 * add: Liegt das Produkt schon im Warenkorb, steigt nur die quantity.
 * remove: entfernt die Position mit dieser productId.
 */
export const reduceCart = (cart: CartItem[], action: Action): CartItem[] => {
  // TODO: add hängt an oder erhöht die quantity, remove filtert die Position heraus
  throw new Error('TODO: reduceCart')
}

/** Gesamtsumme in Cent: Σ quantity × priceCents */
export const totalCents = (cart: CartItem[]): number => {
  // TODO: mit reduce aufsummieren
  throw new Error('TODO: totalCents')
}

/** Reiner Reducer für die LRU-Liste der letzten Suchen. */
export const pushRecent =
  (limit: number) =>
  (recent: string[], term: string): string[] => {
    // TODO: term nach vorn, Duplikat entfernen, auf limit kürzen. Leere Begriffe ignorieren.
    throw new Error('TODO: pushRecent')
  }

export type CartViewModel = {
  add: (product: Product, quantity?: number) => void
  remove: (productId: string) => void
  /** true, solange die Bestellung abgeschickt wird */
  setPlacing: (placing: boolean) => void
  search: (term: string) => void
  cart$: Observable<CartItem[]>
  totalCents$: Observable<number>
  canPlace$: Observable<boolean>
  recentSearches$: Observable<string[]>
}

export const createCartViewModel = (): CartViewModel => {
  // TODO: Subject<Action> für den Warenkorb, Subject<string> für Suchen, BehaviorSubject<boolean> für placing
  // TODO: cart$ mit scan(reduceCart, []), startWith([]), shareReplay({ bufferSize: 1, refCount: true })
  // TODO: totalCents$ aus cart$ ableiten, mit distinctUntilChanged
  // TODO: canPlace$ = combineLatest({ cart: cart$, placing: placing$ }): Warenkorb nicht leer und nicht placing
  // TODO: recentSearches$ mit scan(pushRecent(5), []), startWith([]), shareReplay
  throw new Error('TODO: createCartViewModel')
}
