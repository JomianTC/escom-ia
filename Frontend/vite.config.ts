import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@api': '/src/api',
      '@utils': '/src/utilities',
      '@guards': '/src/guards',
      "@hooks": "/src/pages/hooks",
      "@layouts": "/src/pages/layouts",
      "@models": "/src/models",
      "@types": "/src/types",
      "@store": "/src/store",
      "@pages/private": "/src/pages/Private",
    },
  },
})
