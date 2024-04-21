import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://Vignesh-Mariappan.github.io/react-machine-coding/tic-tac-toe/',
});