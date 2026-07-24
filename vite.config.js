import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config for React + Tailwind CSS v3 (PostCSS)
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Force Vite to pre-bundle CJS libraries as ES modules
    include: ['react-phone-input-2'],
  },
})
