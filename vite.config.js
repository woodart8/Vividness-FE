import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'https://api.vividness.co',  // /api 경로를 localhost:5000으로 프록시
    },
  },
});
