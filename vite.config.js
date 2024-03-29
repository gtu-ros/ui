import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dsv from '@rollup/plugin-dsv';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      dsv()
    ]
  };
});
