import { dirname, join } from 'node:path'
import { defineConfig, type Plugin } from 'vitest/config'

// RX_TARGET=solution runs the tests against solution/index.ts instead of
// your starting point index.ts. The tests themselves stay unchanged.
const target = process.env.RX_TARGET === 'solution' ? 'solution' : 'exercise'

const useSolution = (): Plugin => ({
  name: 'rx-use-solution',
  enforce: 'pre',
  // Vitest caches transformed modules. The key has to know the target,
  // otherwise one run returns the result of the other.
  configureVitest({ defineCacheKeyGenerator }) {
    defineCacheKeyGenerator(() => `rx-target-${target}`)
  },
  resolveId(source, importer) {
    if (target !== 'solution' || !importer) return null
    if (source !== './index.js' || !/[\\/]exercises[\\/][^\\/]+[\\/][^\\/]+\.test\.ts$/.test(importer)) {
      return null
    }
    return join(dirname(importer), 'solution', 'index.ts')
  },
})

export default defineConfig({
  plugins: [useSolution()],
  test: {
    include: ['exercises/**/*.test.ts'],
    // rx-marble-testing runs with node:test (npm run test:marble), not with Vitest
    exclude: ['**/node_modules/**', 'exercises/*/solution/**', 'exercises/rx-marble-testing/**'],
    testTimeout: 5_000,
  },
})
