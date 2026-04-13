import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          'react-vendor': ['react', 'react-dom', 'react-router'],
          'gsap-vendor': ['gsap', '@gsap/react'],
        },
      },
    },
  },
})

