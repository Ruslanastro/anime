import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  root: '.',
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: []
    }
  }
});