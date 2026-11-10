/**
 * Lesson rx-ui-state: UI state as a stream of Actions
 *
 * Task: Build the view model for the cart in the workshop shop. Actions
 * run through a Subject, scan condenses them with a pure reducer into the
 * cart. You derive the total and “may place order?” as separate
 * streams. In addition, you keep the last five product searches as an LRU list.
 *
 * You always calculate money in whole cents (priceCents), never with decimals.
 *
 * LRU means Least Recently Used: the newest search comes first. If a
 * term comes again, it moves to the front instead of appearing twice in the list.
 * From six entries on, the oldest one drops off at the end.
 *
 * The reducers are pure functions. Test them without streams, the rest with scan.
 */
import { Observable } from 'rxjs'

export type Product = { id: string; name: string; priceCents: number; stock: number }
export type CartItem = { productId: string; quantity: number; priceCents: number }

export type Action = { type: 'add'; item: CartItem } | { type: 'remove'; productId: string }

/**
 * Pure reducer for the cart. Always returns a new array.
 * add: if the product is already in the cart, only the quantity rises.
 * remove: removes the item with this productId.
 */
export const reduceCart = (cart: CartItem[], action: Action): CartItem[] => {
  // TODO: add appends or raises the quantity, remove filters the item out
  throw new Error('TODO: reduceCart')
}

/** Total in cents: Σ quantity × priceCents */
export const totalCents = (cart: CartItem[]): number => {
  // TODO: sum up with reduce
  throw new Error('TODO: totalCents')
}

/** Pure reducer for the LRU list of the last searches. */
export const pushRecent =
  (limit: number) =>
  (recent: string[], term: string): string[] => {
    // TODO: term to the front, remove the duplicate, cut to limit. Ignore empty terms.
    throw new Error('TODO: pushRecent')
  }

export type CartViewModel = {
  add: (product: Product, quantity?: number) => void
  remove: (productId: string) => void
  /** true while the order is being submitted */
  setPlacing: (placing: boolean) => void
  search: (term: string) => void
  cart$: Observable<CartItem[]>
  totalCents$: Observable<number>
  canPlace$: Observable<boolean>
  recentSearches$: Observable<string[]>
}

export const createCartViewModel = (): CartViewModel => {
  // TODO: Subject<Action> for the cart, Subject<string> for searches, BehaviorSubject<boolean> for placing
  // TODO: cart$ with scan(reduceCart, []), startWith([]), shareReplay({ bufferSize: 1, refCount: true })
  // TODO: derive totalCents$ from cart$, with distinctUntilChanged
  // TODO: canPlace$ = combineLatest({ cart: cart$, placing: placing$ }): cart not empty and not placing
  // TODO: recentSearches$ with scan(pushRecent(5), []), startWith([]), shareReplay
  throw new Error('TODO: createCartViewModel')
}
