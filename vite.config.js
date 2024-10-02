import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    viteCompression({ algotithm: 'brotliCompress' })
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true
  },
  build: {
    mimify: 'terser',
    sourcemap: true,
    chunkSizeWarningLimit: 500,
  }
})
