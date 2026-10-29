/**
 * Eine simulierte WebSocket-Verbindung. Sie zählt, wie oft sie geöffnet
 * und geschlossen wird, und verteilt Nachrichten an offene Verbindungen.
 */
export type Connection = {
  onMessage: (listener: (message: string) => void) => void
  close: () => void
}

export class FakeSocketServer {
  opened = 0
  closed = 0
  private readonly listeners = new Set<(message: string) => void>()

  get openConnections() {
    return this.opened - this.closed
  }

  connect(): Connection {
    this.opened++
    let listener: ((message: string) => void) | undefined
    return {
      onMessage: (next) => {
        listener = next
        this.listeners.add(next)
      },
      close: () => {
        this.closed++
        if (listener) this.listeners.delete(listener)
      },
    }
  }

  broadcast(message: string) {
    for (const listener of this.listeners) listener(message)
  }
}
