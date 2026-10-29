import { firstValueFrom, Subject } from 'rxjs'
import { describe, expect, test } from 'vitest'
import { coldUser$, sharedUser$, type User } from './index.js'

const ada: User = { id: '42', name: 'Ada' }

/** Ein Fake-Backend ohne Mock-Library: zählt Aufrufe und antwortet erst, wenn der Test es sagt. */
const createBackend = () => {
  const respond = new Subject<void>()
  let calls = 0
  return {
    loadUser: () => {
      calls++
      return firstValueFrom(respond).then(() => ada)
    },
    respond: () => respond.next(),
    get calls() {
      return calls
    },
  }
}

const flush = () => new Promise((resolve) => setTimeout(resolve, 0))

describe('rx-cold-hot', () => {
  test('cold: ohne subscribe läuft kein Request', () => {
    const backend = createBackend()
    coldUser$(backend.loadUser, () => {})
    expect(backend.calls).toBe(0)
  })

  test('cold: zwei Subscriber lösen zwei Requests aus', async () => {
    const backend = createBackend()
    let requests = 0
    const user$ = coldUser$(backend.loadUser, () => requests++)
    const header: User[] = []
    const sidebar: User[] = []

    user$.subscribe((user) => header.push(user))
    user$.subscribe((user) => sidebar.push(user))
    backend.respond()
    await flush()

    expect(backend.calls).toBe(2)
    expect(requests).toBe(2)
    expect(header).toEqual([ada])
    expect(sidebar).toEqual([ada])
  })

  test('hot mit share: zwei Subscriber teilen sich einen Request', async () => {
    const backend = createBackend()
    let requests = 0
    const user$ = sharedUser$(backend.loadUser, () => requests++)
    const header: User[] = []
    const sidebar: User[] = []

    user$.subscribe((user) => header.push(user))
    user$.subscribe((user) => sidebar.push(user))
    backend.respond()
    await flush()

    expect(backend.calls).toBe(1)
    expect(requests).toBe(1)
    expect(header).toEqual([ada])
    expect(sidebar).toEqual([ada])
  })

  test('hot mit share: nach complete startet ein neuer Subscriber einen neuen Request', async () => {
    const backend = createBackend()
    const user$ = sharedUser$(backend.loadUser, () => {})

    user$.subscribe()
    backend.respond()
    await flush()

    user$.subscribe()
    backend.respond()
    await flush()

    expect(backend.calls).toBe(2)
  })
})
