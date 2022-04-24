import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'weather.css': resolve(__dirname, './src/weather.css'),
      store: resolve(__dirname, './src/store/store'),
      pages: resolve(__dirname, './src/pages/'),
      entities: resolve(__dirname, './src/entities/'),
      components: resolve(__dirname, './src/components/'),
    },
  },
});
