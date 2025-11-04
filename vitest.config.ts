/// <reference types="vitest" />

import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, './vitest.setup.ts', '**/build/**/*', '**/node_modules/**/*', './e2e/**/*'],
    setupFiles: ['./vitest.setup.ts', './__mocks__/mock-dekoratoren-moduler.ts'],
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      provider: 'v8'
    },
    reporters: ['vitest-sonar-reporter', 'default'],
    outputFile: 'sonar-report.xml',
    css: {
      include: [],
      modules: {
        classNameStrategy: 'non-scoped'
      }
    }
  }
});
