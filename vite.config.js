import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/trivia-questions-game/',
  server: {
    port: 4000
  },
  plugins: [react()]
})
