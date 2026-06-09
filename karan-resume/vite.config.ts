/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      includePublic: false,
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
    }),
  ],
  base: '/',
  resolve: {
    // react-transition-group ships a bare directory with no exports field; ESM
    // resolution rejects directory imports, so point directly at the CJS file.
    alias: {
      'react-transition-group/TransitionGroupContext':
        'react-transition-group/cjs/TransitionGroupContext.js',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setupTests.ts'],
    server: {
      deps: {
        // Force these through Vite so the resolve.alias above fixes the
        // directory-import issue in react-transition-group on ESM.
        inline: ['@mui/material', 'react-transition-group'],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json-summary'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/tests/**',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/reportWebVitals.js',
        'src/components/AsherZoneContent.tsx',
        'src/modules/AsherZone.ts',
      ],
    },
  },
});
