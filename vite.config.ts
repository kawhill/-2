import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    // 优化构建
    rollupOptions: {
      output: {
        manualChunks: {
          'leaflet': ['leaflet'],
          'vue': ['vue']
        }
      }
    },
    // 生成源映射以便调试（可选）
    sourcemap: false,
    // 警告文件大小限制
    chunkSizeWarningLimit: 1000
  }
})
