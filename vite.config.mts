import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/fritak-agp/',
  plugins: [react(), viteTsconfigPaths(), visualizer() as PluginOption],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
    proxy: {
      '/fritak-agp/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    manifest: true,
    rollupOptions: {
      external: ['./nais.js'],
      output: {
        advancedChunks: {
          groups: [{ name: 'vendor', test: /\/react(?:-dom)?/ }]
        }
      }
    }
  }
});
