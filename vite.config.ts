import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/download-model': {
        target: 'https://github.com/MuhammadHabibna/aksara-jawa-classifier/releases/download/model-v1/aksara_jawa_resnet18.onnx',
        changeOrigin: true,
        rewrite: () => '', // Remove the path, just fetch the target
      }
    }
  }
})
