// vite.config.ts
import react from "file:///H:/Documentos/RepositoriosGitHub/escom-ia/Frontend/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///H:/Documentos/RepositoriosGitHub/escom-ia/Frontend/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///H:/Documentos/RepositoriosGitHub/escom-ia/Frontend/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      registerType: "autoUpdate",
      manifest: {
        name: "ESCOM++",
        short_name: "ESCOM++",
        description: "Escom IA centralizador de tr\xE1mites escolares y opinion de profesores",
        theme_color: "#ffffff",
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
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@api": "/src/api",
      "@utils": "/src/utilities",
      "@guards": "/src/guards",
      "@hooks": "/src/pages/hooks",
      "@layouts": "/src/pages/layouts",
      "@models": "/src/models",
      "@types": "/src/types",
      "@store": "/src/store",
      "@pages/private": "/src/pages/Private"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJIOlxcXFxEb2N1bWVudG9zXFxcXFJlcG9zaXRvcmlvc0dpdEh1YlxcXFxlc2NvbS1pYVxcXFxGcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiSDpcXFxcRG9jdW1lbnRvc1xcXFxSZXBvc2l0b3Jpb3NHaXRIdWJcXFxcZXNjb20taWFcXFxcRnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0g6L0RvY3VtZW50b3MvUmVwb3NpdG9yaW9zR2l0SHViL2VzY29tLWlhL0Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCksXHJcbiAgICBWaXRlUFdBKHtcclxuICAgICAgc3RyYXRlZ2llczogJ2luamVjdE1hbmlmZXN0JyxcclxuICAgICAgc3JjRGlyOiAnc3JjJyxcclxuICAgICAgZmlsZW5hbWU6ICdzdy5qcycsXHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIG5hbWU6ICdFU0NPTSsrJyxcclxuICAgICAgICBzaG9ydF9uYW1lOiAnRVNDT00rKycsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdFc2NvbSBJQSBjZW50cmFsaXphZG9yIGRlIHRyXHUwMEUxbWl0ZXMgZXNjb2xhcmVzIHkgb3BpbmlvbiBkZSBwcm9mZXNvcmVzJyxcclxuICAgICAgICB0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgIGljb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJzcmNcIjogXCIvYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmdcIixcclxuICAgICAgICAgICAgICBcInNpemVzXCI6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwic3JjXCI6IFwiL2FuZHJvaWQtY2hyb21lLTM4NHgzODQucG5nXCIsXHJcbiAgICAgICAgICAgICAgXCJzaXplc1wiOiBcIjM4NHgzODRcIixcclxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICB9XHJcbiAgICAgfSlcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogJy9zcmMnLFxyXG4gICAgICAnQGNvbXBvbmVudHMnOiAnL3NyYy9jb21wb25lbnRzJyxcclxuICAgICAgJ0BwYWdlcyc6ICcvc3JjL3BhZ2VzJyxcclxuICAgICAgJ0BhcGknOiAnL3NyYy9hcGknLFxyXG4gICAgICAnQHV0aWxzJzogJy9zcmMvdXRpbGl0aWVzJyxcclxuICAgICAgJ0BndWFyZHMnOiAnL3NyYy9ndWFyZHMnLFxyXG4gICAgICBcIkBob29rc1wiOiBcIi9zcmMvcGFnZXMvaG9va3NcIixcclxuICAgICAgXCJAbGF5b3V0c1wiOiBcIi9zcmMvcGFnZXMvbGF5b3V0c1wiLFxyXG4gICAgICBcIkBtb2RlbHNcIjogXCIvc3JjL21vZGVsc1wiLFxyXG4gICAgICBcIkB0eXBlc1wiOiBcIi9zcmMvdHlwZXNcIixcclxuICAgICAgXCJAc3RvcmVcIjogXCIvc3JjL3N0b3JlXCIsXHJcbiAgICAgIFwiQHBhZ2VzL3ByaXZhdGVcIjogXCIvc3JjL3BhZ2VzL1ByaXZhdGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVixPQUFPLFdBQVc7QUFDcFcsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlO0FBR3hCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUFDLE1BQU07QUFBQSxJQUNkLFFBQVE7QUFBQSxNQUNOLFlBQVk7QUFBQSxNQUNaLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxRQUNSLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDSSxPQUFPO0FBQUEsWUFDUCxTQUFTO0FBQUEsWUFDVCxRQUFRO0FBQUEsVUFDWjtBQUFBLFVBQ0E7QUFBQSxZQUNJLE9BQU87QUFBQSxZQUNQLFNBQVM7QUFBQSxZQUNULFFBQVE7QUFBQSxVQUNaO0FBQUEsUUFDSjtBQUFBLE1BQ0E7QUFBQSxJQUNELENBQUM7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxlQUFlO0FBQUEsTUFDZixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsTUFDWixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixrQkFBa0I7QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
