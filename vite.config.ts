import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The client build writes docs/, which GitHub Pages serves from master /docs;
// `pnpm build` then prerenders every route into it (src/build/main.ts).
export default defineConfig({
  plugins: [react()],
  build: { outDir: 'docs', emptyOutDir: true },
  test: { environment: 'node', include: ['src/**/*.test.{ts,tsx}', 'test/**/*.test.{ts,tsx}'] },
});
