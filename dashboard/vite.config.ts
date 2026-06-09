// Vite config — React, Tailwind, shared imports, and Docker-friendly file watching.
import fs from 'fs'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const localShared = path.resolve(__dirname, '../shared')
const dockerShared = path.resolve(__dirname, 'shared')
const sharedDir = fs.existsSync(path.join(dockerShared, 'fleet-defaults.ts'))
  ? dockerShared
  : localShared

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@shared': sharedDir,
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, '..'), sharedDir],
    },
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
})
