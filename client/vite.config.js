import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No proxy needed anymore — frontend calls our own backend directly
export default defineConfig({
  plugins: [react()],
})
