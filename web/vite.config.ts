import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: '../dist',
  },
  esbuild: {
    tsconfigRaw: require('../tsconfig.web.json'),
  },
  publicDir: path.resolve(__dirname, '../public'),
  plugins: [react(), tsconfigPaths()],
  root: path.resolve(__dirname),
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
});
