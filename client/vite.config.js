import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true //Vite 会将前端请求头中的 Origin 和 Host 修改为目标地址，让后端以为这就是“本地访问”，从而避免 CORS 拒绝
      }
    }
  },
  define: {
    'global': 'globalThis'
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
