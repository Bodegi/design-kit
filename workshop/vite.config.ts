import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  root: import.meta.dirname,
  base: './',
  server: {
    port: 5173,
    open: false
  },
  build: {
    outDir: path.resolve(import.meta.dirname, '../dist/workshop'),
    emptyOutDir: true
  }
});
