import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  // depending on your application, base can also be "/"
  // In development, the app runs at root /
  // In production, it runs at /fritak-agp/
  base: process.env.NODE_ENV === 'production' ? '/fritak-agp/' : '/',
  resolve: {
    tsconfigPaths: true
  },
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
  build: {
    manifest: true,
    rollupOptions: {
      external: ['./nais.js'],
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor-react', test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/ },
            { name: 'vendor-nav', test: /[\\/]node_modules[\\/]@navikt[\\/](ds-react|aksel-icons)[\\/]/ },
            { name: 'vendor-nav-dekorator', test: /[\\/]node_modules[\\/]@navikt[\\/]nav-dekoratoren-moduler[\\/]/ },
            { name: 'vendor-i18n', test: /[\\/]node_modules[\\/](i18next|react-i18next)[\\/]/ }
          ]
        }
      }
    }
  }
});
