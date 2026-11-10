import {
  BehaviorSubject,
  Subject,
  combineLatest,
  distinctUntilChanged,
  map,
  scan,
  shareReplay,
  startWith,
  type Observable,
} from 'rxjs'

export type Product = { id: string; name: string; priceCents: number; stock: number }
export type CartItem = { productId: string; quantity: number; priceCents: number }

export type Action = { type: 'add'; item: CartItem } | { type: 'remove'; productId: string }

/**
 * Pure reducer for the cart. Always returns a new array.
 * Only the changed item is copied, all others stay the same objects.
 */
export const reduceCart = (cart: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case 'add': {
      const { item } = action
      const exists = cart.some((entry) => entry.productId === item.productId)
      return exists
        ? cart.map((entry) =>
            entry.productId === item.productId ? { ...entry, quantity: entry.quantity + item.quantity } : entry,
          )
        : [...cart, item]
    }
    case 'remove':
      return cart.filter((item) => item.productId !== action.productId)
  }
}

/** Total in cents: Σ quantity × priceCents */
export const totalCents = (cart: CartItem[]): number =>
  cart.reduce((sum, item) => sum + item.quantity * item.priceCents, 0)

/** Pure reducer for the LRU list of the last searches. */
export const pushRecent =
  (limit: number) =>
  (recent: string[], term: string): string[] => {
    const trimmed = term.trim()
    if (trimmed === '') return recent
    return [trimmed, ...recent.filter((entry) => entry !== trimmed)].slice(0, limit)
  }

export type CartViewModel = {
  add: (product: Product, quantity?: number) => void
  remove: (productId: string) => void
  setPlacing: (placing: boolean) => void
  search: (term: string) => void
  cart$: Observable<CartItem[]>
  totalCents$: Observable<number>
  canPlace$: Observable<boolean>
  recentSearches$: Observable<string[]>
}

export const createCartViewModel = (): CartViewModel => {
  const actions = new Subject<Action>()
  const searches = new Subject<string>()
  const placing$ = new BehaviorSubject(false)

  // Actions in, state out
  const cart$ = actions.pipe(
    scan(reduceCart, [] as CartItem[]),
    startWith([] as CartItem[]),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  // Derived state instead of flags you have to keep in sync by hand
  const totalCents$ = cart$.pipe(map(totalCents), distinctUntilChanged())

  const canPlace$ = combineLatest({ cart: cart$, placing: placing$ }).pipe(
    map(({ cart, placing }) => cart.length > 0 && !placing),
    distinctUntilChanged(),
  )

  const recentSearches$ = searches.pipe(
    scan(pushRecent(5), [] as string[]),
    distinctUntilChanged(),
    startWith([] as string[]),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  return {
    add: (product, quantity = 1) =>
      actions.next({ type: 'add', item: { productId: product.id, quantity, priceCents: product.priceCents } }),
    remove: (productId) => actions.next({ type: 'remove', productId }),
    setPlacing: (placing) => placing$.next(placing),
    search: (term) => searches.next(term),
    cart$,
    totalCents$,
    canPlace$,
    recentSearches$,
  }
}
