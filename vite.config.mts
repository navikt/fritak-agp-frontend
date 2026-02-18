import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  // depending on your application, base can also be "/"
  // In development, the app runs at root /
  // In production, it runs at /fritak-agp/
  base: process.env.NODE_ENV === 'production' ? '/fritak-agp/' : '/',
  plugins: [
    react(),
    viteTsconfigPaths(),
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
  build: {
    manifest: true,
    rollupOptions: {
      external: ['./nais.js'],
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-nav': ['@navikt/ds-react', '@navikt/aksel-icons'],
          'vendor-nav-dekorator': ['@navikt/nav-dekoratoren-moduler'],
          'vendor-i18n': ['i18next', 'react-i18next']
        }
      }
    }
  }
});
