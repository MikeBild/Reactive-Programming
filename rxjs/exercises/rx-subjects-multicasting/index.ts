/**
 * Lektion rx-subjects-multicasting: Subjects teilen Werte, share teilt Arbeit
 *
 * Aufgabe: Teile eine simulierte WebSocket-Verbindung mit share, sodass sie
 * beim ersten Subscriber öffnet und erst schließt, wenn der letzte sich abmeldet.
 * Der Letzte macht das Licht aus.
 *
 * Zusatz: Bau einen CartStore mit BehaviorSubject, damit späte Subscriber
 * sofort den aktuellen Warenkorb bekommen.
 */
import { Observable } from 'rxjs'
import { type FakeSocketServer } from './fake-socket.js'

/** Cold: jeder Subscriber öffnet eine eigene Verbindung, unsubscribe schließt sie. */
export const connectSocket = (server: FakeSocketServer): Observable<string> =>
  new Observable<string>((subscriber) => {
    // TODO: server.connect(), Nachrichten per subscriber.next weiterreichen,
    //       als Teardown connection.close() zurückgeben
    subscriber.error(new Error('TODO: connectSocket'))
  })

/** Hot: eine geteilte Verbindung für alle Subscriber. */
export const sharedSocket = (server: FakeSocketServer): Observable<string> => {
  // TODO: connectSocket(server) mit share teilen
  throw new Error('TODO: sharedSocket')
}

export class CartStore {
  // TODO: private readonly items = new BehaviorSubject<string[]>([])
  readonly items$: Observable<string[]> = new Observable<string[]>((subscriber) =>
    subscriber.error(new Error('TODO: items$')),
  )

  add(item: string): void {
    // TODO: neuen Array mit item per next setzen
    throw new Error('TODO: add')
  }

  get current(): string[] {
    // TODO: aktuellen Wert aus dem BehaviorSubject lesen
    throw new Error('TODO: current')
  }
}
