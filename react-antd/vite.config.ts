import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      threshold: 10240,
    })
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': "/src"
    },
  },
  base: './',
  // 配置build后的文件夹名
  build: {
    outDir: 'start-page-dist',
    // reportCompressedSize: false,
  },
})

