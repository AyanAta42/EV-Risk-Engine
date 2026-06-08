import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const localShared = path.resolve(__dirname, '../shared')
const dockerShared = path.resolve(__dirname, 'shared')
const sharedDir = fs.existsSync(path.join(dockerShared, 'constants.ts'))
  ? dockerShared
  : localShared

export default defineConfig({
  plugins: [react()],
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
      // Docker Desktop on Windows often misses file events from volume mounts.
      usePolling: true,
      interval: 300,
    },
  },
})
