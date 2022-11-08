import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    server: {
      origin: 'http://192.168.100.6'
    },
    port: 3006,
  }
})
