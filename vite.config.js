import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) =>{

  return {
    server: {
      proxy: {
          '/api': {
              target: `${env.VITE_BACKEND}`,
              // changeOrigin: true,
              // secure: false, 
            }
          }
  },        
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
};
});
