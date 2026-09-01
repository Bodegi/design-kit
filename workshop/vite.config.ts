import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  root: path.resolve(__dirname),
  base: './',
  server: {
    port: 5173,
    open: false
  },
  build: {
    outDir: path.resolve(__dirname, '../dist/workshop'),
    emptyOutDir: true
  }
});
