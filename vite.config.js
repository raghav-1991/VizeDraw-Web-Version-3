import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build` → normal multi-asset build in dist/.
// `SINGLE=1 npm run build` → one self-contained HTML file (used for the hosted preview).
export default defineConfig({
  plugins: [react(), ...(process.env.SINGLE ? [viteSingleFile()] : [])],
  build: { outDir: process.env.SINGLE ? 'dist-single' : 'dist' },
});
