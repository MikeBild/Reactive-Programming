import { BehaviorSubject, Observable, share } from 'rxjs'
import { type FakeSocketServer } from '../fake-socket.js'

/** Cold: jeder Subscriber öffnet eine eigene Verbindung, unsubscribe schließt sie. */
export const connectSocket = (server: FakeSocketServer): Observable<string> =>
  new Observable<string>((subscriber) => {
    const connection = server.connect()
    connection.onMessage((message) => subscriber.next(message))
    return () => connection.close()
  })

/**
 * Hot: eine geteilte Verbindung für alle Subscriber.
 * share zählt die Subscriber mit. Fällt die Zahl auf null, meldet share die
 * Quelle ab (resetOnRefCountZero ist per Default true) und die Verbindung schließt.
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
