/**
 * Lesson rx-cold-hot: Cold or hot, who starts the producer?
 *
 * Task: Subscribe to a defer-fetch Observable twice, count the requests
 * with tap, and then share the execution with share so that only one request runs.
 *
 * Instead of fetch you get loadUser passed in, onRequest counts along.
 * Step 1: finish coldUser$ and see in the test that two requests run.
 * Step 2: build sharedUser$ so that two subscribers trigger only one request.
 */
import { Observable } from 'rxjs'

export type User = { id: string; name: string }

/** Cold: every subscribe starts its own request. */
export const coldUser$ = (loadUser: () => Promise<User>, onRequest: () => void): Observable<User> => {
  // TODO: defer(() => loadUser()) and call onRequest via tap
  throw new Error('TODO: coldUser$')
}

/** Hot: all concurrent subscribers share one request. */
export const sharedUser$ = (loadUser: () => Promise<User>, onRequest: () => void): Observable<User> => {
  // TODO: reuse coldUser$ and share it with share
  throw new Error('TODO: sharedUser$')
}
