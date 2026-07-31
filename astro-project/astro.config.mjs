import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  root: '.',
  server: { host: true },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: []
    }
  }
});