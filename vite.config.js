import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    viteCompression({ algorithm: 'brotliCompress' })
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    // Permite que Vite responda cuando el host es caja.local (via Traefik)
    allowedHosts: ['caja.local'],
    historyApiFallback: true,
  },
  build: {
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
  }
})
