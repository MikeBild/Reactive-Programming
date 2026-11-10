/**
 * Lesson rx-subjects-multicasting: Subjects share values, share shares work
 *
 * Task: Share a simulated WebSocket connection with share so that it
 * opens on the first subscriber and only closes when the last one unsubscribes.
 * The last one turns off the light.
 *
 * Extra: Build a CartStore with BehaviorSubject so that late subscribers
 * get the current cart immediately.
 */
import { Observable } from 'rxjs'
import { type FakeSocketServer } from './fake-socket.js'

/** Cold: every subscriber opens its own connection, unsubscribe closes it. */
export const connectSocket = (server: FakeSocketServer): Observable<string> =>
  new Observable<string>((subscriber) => {
    // TODO: server.connect(), pass messages on via subscriber.next,
    //       return connection.close() as teardown
    subscriber.error(new Error('TODO: connectSocket'))
  })

/** Hot: one shared connection for all subscribers. */
export const sharedSocket = (server: FakeSocketServer): Observable<string> => {
  // TODO: share connectSocket(server) with share
  throw new Error('TODO: sharedSocket')
}

export class CartStore {
  // TODO: private readonly items = new BehaviorSubject<string[]>([])
  readonly items$: Observable<string[]> = new Observable<string[]>((subscriber) =>
    subscriber.error(new Error('TODO: items$')),
  )

  add(item: string): void {
    // TODO: set a new array with item via next
    throw new Error('TODO: add')
  }

  get current(): string[] {
    // TODO: read the current value from the BehaviorSubject
    throw new Error('TODO: current')
  }
}
