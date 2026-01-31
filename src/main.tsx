import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as ort from 'onnxruntime-web';
import './index.css'
import App from './App.tsx'

// Configure WASM paths for Cloudflare Pages (Static Site)
ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
