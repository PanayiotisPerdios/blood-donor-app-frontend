import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) =>{
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      proxy: {
          '/api': {
              target: `${env.VITE_BACKEND}`,
              changeOrigin: true,
              secure: false, 
            },
            '/api/auth/signin': {
              target: `${env.VITE_BACKEND}`,
              
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
