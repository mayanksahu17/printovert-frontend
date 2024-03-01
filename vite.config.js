// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://printovert-backend.onrender.com', 
      // '/api': 'http://localhost:8000', 
  },
  plugins: [react()],
}});
