import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // base must match the GitHub-Pages path: https://lucathth.github.io/wtest/
  base: '/wtest/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // @ → src/  (same convention as shadcn/Next.js projects)
      '@': path.resolve(__dirname, './src'),
    },
  },
})
