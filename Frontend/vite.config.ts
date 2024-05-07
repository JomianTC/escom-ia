import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      manifest: {
        name: 'ESCOM++',
        short_name: 'ESCOM++',
        description: 'Escom IA centralizador de trámites escolares y opinion de profesores',
        theme_color: '#ffffff',
        icons: [
          {
              "src": "/android-chrome-192x192.png",
              "sizes": "192x192",
              "type": "image/png"
          },
          {
              "src": "/android-chrome-384x384.png",
              "sizes": "384x384",
              "type": "image/png"
          }
      ],
      }
     })
  ],
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
