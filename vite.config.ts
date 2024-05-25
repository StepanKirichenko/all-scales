import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import path from 'node:path'

export default defineConfig({
  resolve: {
    "alias": {
      "@lib": path.resolve(__dirname, 'src', 'lib'),
      "@services": path.resolve(__dirname, 'src', 'services'),
      "@ui": path.resolve(__dirname, 'src', 'ui'),
    },
  },
  plugins: [solid()],
  base: '/all-scales',
})
