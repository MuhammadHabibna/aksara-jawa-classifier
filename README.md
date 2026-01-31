# Aksara Jawa Classifier Web App

Web application for classifying Javanese script (Aksara Jawa) using a fine-tuned ResNet18 model. Built with React, Vite, Tailwind CSS, and ONNX Runtime Web.

## Features
- **Client-Side Inference**: Runs entirely in the browser using WebAssembly (ONNX Runtime Web). No server-side inference.
- **Privacy First**: Images never leave your device.
- **Performance Optimized**: Uses letterbox resizing and efficient preprocessing.
- **Metrics Display**: Visualizes model performance stats (Accuracy: 98.6%).

## Project Structure
```
/public
  /model/model.onnx       # Place your ONNX model here
  /metrics/               # Place static evaluation charts here
/src
  /components             # UI Components (Dropzone, Results, etc.)
  /utils                  # Inference & Preprocessing logic
  App.tsx                 # Main application logic
  config.ts               # Configuration (Classes, Metadata)
```

## Setup & Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Prepare Assets (Required)**
   Export the following files from your training notebook and place them in the correct folders:

   **`public/model/`**
   - `aksara_jawa_resnet18.onnx` (ResNet18, Opspset 12+, ~45MB)

   **`public/metrics/`**
   - `confusion_matrix.png` (Recommended: 1200x1200px, Optimized PNG)
   - `f1_score.png` (Recommended: 1200x675px or 16:9 aspect ratio)
   - `true_examples.png` (Collage of correct predictions)
   - `wrong_examples.png` (Collage of incorrect predictions)

3. **Run Local Dev Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment (Cloudflare Pages)

This project is optimized for Cloudflare Pages (Static Site Hosting).

1. Connect your GitHub repository to Cloudflare Pages.
2. Select **Vite** as the framework preset.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy!

## Model & Assets
- **Model Replacement**: Replace `public/model/model.onnx` with your fine-tuned model. Ensure input size matches `src/config.ts`.
- **Metrics Images**: Replace images in `public/metrics/` with your own confusion matrix/graphs.

## Tech Stack
- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **Inference**: ONNX Runtime Web
- **Icons**: Lucide React

## Model Download Troubleshooting
If you see "Failed to load model", check the following:
1.  **Network**: specific endpoints like `github.com` or `objects.githubusercontent.com` might be blocked.
2.  **Console**: Open DevTools (F12) -> Console. Look for "Failed to fetch" errors.
3.  **Network Tab**: Check for red (failed) requests to `.onnx` files.
    - If Status is 404: The release tag or filename in `config.ts` might be wrong.
    - If Status is 403: The direct link might have expired (for direct asset URLs).
    - If CORS error: The proxy (`/download-model`) might be failing, or the fallback URL doesn't support CORS.
4.  **Solution**: Ensure the proxy is working. Check `functions/download-model.js` and `vite.config.ts`. The app now relies on `/download-model` only.

## Verification Steps
1.  Open `https://<your-domain>/download-model` in browser -> should start downloading the ONNX file.
2.  Open DevTools -> Network -> Reload app.
    - Check request to `/download-model` (Status 200).
    - Check request to `ort-wasm.wasm` (Status 200, from `cdn.jsdelivr.net`).
3.  If both work but app says "Failed", check Console for detailed error.
