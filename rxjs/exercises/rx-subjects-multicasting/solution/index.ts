import { BehaviorSubject, Observable, share } from 'rxjs'
import { type FakeSocketServer } from '../fake-socket.js'

/** Cold: every subscriber opens its own connection, unsubscribe closes it. */
export const connectSocket = (server: FakeSocketServer): Observable<string> =>
  new Observable<string>((subscriber) => {
    const connection = server.connect()
    connection.onMessage((message) => subscriber.next(message))
    return () => connection.close()
  })

/**
 * Hot: one shared connection for all subscribers.
 * share counts the subscribers. When the count drops to zero, share unsubscribes
 * from the source (resetOnRefCountZero is true by default) and the connection closes.
 */
export const sharedSocket = (server: FakeSocketServer): Observable<string> => connectSocket(server).pipe(share())

export class CartStore {
  private readonly items = new BehaviorSubject<string[]>([])
  readonly items$: Observable<string[]> = this.items.asObservable()

  add(item: string): void {
    this.items.next([...this.items.value, item])
  }

  get current(): string[] {
    return this.items.value
  }
}
