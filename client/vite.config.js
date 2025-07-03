import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'global': 'globalThis'
  },
  plugins: [vue()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify'
    }
  }
})
