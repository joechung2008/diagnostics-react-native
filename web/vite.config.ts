import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '../dist',
  },
  esbuild: {
    tsconfigRaw: require('../tsconfig.web.json'),
  },
  publicDir: path.resolve(__dirname, '../public'),
  plugins: [react()],
  root: path.resolve(__dirname),
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
});
