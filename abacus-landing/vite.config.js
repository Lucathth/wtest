import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // base muss dem GitHub-Pages-Pfad entsprechen:
  // https://lucathth.github.io/wtest/ → base: '/wtest/'
  base: '/wtest/',
  plugins: [react(), tailwindcss()],
})
