import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    exclude: ['node_modules', 'e2e', '.next'],
  },
  resolve: {
    alias: {
      '@/components/ui': path.resolve(__dirname, './src/components/ui/index.ts'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/constants': path.resolve(__dirname, './src/constants'),
      '@/validators': path.resolve(__dirname, './src/validators'),
      '@/env': path.resolve(__dirname, './src/env.ts'),
    },
  },
})
