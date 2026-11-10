import { defer, share, tap, type Observable } from 'rxjs'

export type User = { id: string; name: string }

/** Cold: every subscribe starts its own request. */
export const coldUser$ = (loadUser: () => Promise<User>, onRequest: () => void): Observable<User> =>
  defer(() => loadUser()).pipe(tap(() => onRequest()))

/** Hot: all concurrent subscribers share one request. */
export const sharedUser$ = (loadUser: () => Promise<User>, onRequest: () => void): Observable<User> =>
  coldUser$(loadUser, onRequest).pipe(share())
