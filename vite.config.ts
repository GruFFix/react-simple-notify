import { defineConfig } from 'vite'
import path from 'path'

import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: path.resolve('src', 'index.ts'),
        client: path.resolve('src', 'client.tsx'),
      },
      name: 'react-simple-notify',
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    emptyOutDir: true,
  },
  plugins: [
    react(),
    dts({ rollupTypes: true, insertTypesEntry: true, include: ['src'] }),
  ],
})
