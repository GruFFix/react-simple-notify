import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdx()],
  base: './',
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "@/shared/styles/variables.scss";`,
  //     },
  //   },
  // },
})
