import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
   base: '/',
   preview: {
      port: 4173,
      strictPort: true,
   },
   server: {
      port: 4173,
      strictPort: true,
      host: true,
      origin: "http://0.0.0.0:4173",
   },
})
