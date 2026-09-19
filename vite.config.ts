import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: { host: '0.0.0.0', allowedHosts: ['terminal.local'] },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('recharts') || id.includes('d3-')) return 'charts'
          if (id.includes('react-i18next') || id.includes('/i18next')) return 'i18n'
          if (id.includes('dexie') || id.includes('date-fns')) return 'data'
          if (id.includes('@radix-ui')) return 'ui'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
  test: { environment: 'jsdom', setupFiles: './src/test/setup.ts', css: true },
})
