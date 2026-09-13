// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // Any custom Vitest config you require
  test: {
    environment: 'nuxt',
    // You can optionally set Nuxt-specific environment options here
    // environmentOptions: {
    //   nuxt: {
    //     rootDir: fileURLToPath(new URL('./path/to/nuxt/project', import.meta.url)),
    //     domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
    //     overrides: {
    //       // other Nuxt config you want to pass
    //     }
    //   }
    // }
  }
})