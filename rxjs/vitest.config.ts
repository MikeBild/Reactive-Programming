import { dirname, join } from 'node:path'
import { defineConfig, type Plugin } from 'vitest/config'

// RX_TARGET=solution lässt die Tests gegen solution/index.ts statt gegen
// deinen Startpunkt index.ts laufen. Die Tests selbst bleiben unverändert.
const target = process.env.RX_TARGET === 'solution' ? 'solution' : 'exercise'

const useSolution = (): Plugin => ({
  name: 'rx-use-solution',
  enforce: 'pre',
  // Vitest cacht transformierte Module. Der Schlüssel muss das Ziel kennen,
  // sonst liefert ein Lauf das Ergebnis des anderen.
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
    // rx-marble-testing läuft mit node:test (npm run test:marble), nicht mit Vitest
    exclude: ['**/node_modules/**', 'exercises/*/solution/**', 'exercises/rx-marble-testing/**'],
    testTimeout: 5_000,
  },
})
