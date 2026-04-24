import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  // depending on your application, base can also be "/"
  // In development, the app runs at root /
  // In production, it runs at /fritak-agp/
  base: process.env.NODE_ENV === 'production' ? '/fritak-agp/' : '/',
  plugins: [
    react(),
    viteCompression({ algorithm: 'brotliCompress' }),
    visualizer({
      filename: 'dist/stats.html',
      open: process.env.ANALYZE === 'true',
      gzipSize: true,
      brotliSize: true
    })
  ],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  resolve: {
    tsconfigPaths: true
  },
  build: {
    manifest: true,
    rollupOptions: {
      external: ['./nais.js'],
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/@navikt/ds-react') || id.includes('node_modules/@navikt/aksel-icons')) {
            return 'vendor-nav';
          }
          if (id.includes('node_modules/@navikt/nav-dekoratoren-moduler')) {
            return 'vendor-nav-dekorator';
          }
          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
            return 'vendor-i18n';
          }
        }
      }
    }
  }
});
