import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { sentryVitePlugin } from '@sentry/vite-plugin';

import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/fritak-agp/',
  plugins: [
    react(),
    viteTsconfigPaths(),
    visualizer() as PluginOption,
    sentryVitePlugin({
      org: 'nav', // Your Sentry organization slug
      project: 'fritak-agp-frontend', // Your Sentry project name
      authToken: process.env.SENTRY_AUTH_TOKEN // Auth token from environment
    })
  ],
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
  }
});
