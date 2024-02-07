/* eslint-disable no-undef */
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react({
    jsxRuntime: 'classic' // Add this line
  }), 
  ],
  define: {
    'process.env': process.env
  }
});
