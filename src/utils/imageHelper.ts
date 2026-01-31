import { Tensor } from 'onnxruntime-web';
import { MODEL_CONFIG } from '../config';

/**
 * Preprocess an image for the ONNX model.
 * 1. Letterbox resize to 224x224 (maintain aspect ratio, pad with white).
 * 2. Normalize (ImageNet mean/std).
 * 3. Convert to NCHW Float32 Tensor.
 */
export async function preprocessImage(file: File): Promise<{ tensor: Tensor, dataUrl: string }> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                const { inputSize, mean, std } = MODEL_CONFIG;
                const canvas = document.createElement('canvas');
                canvas.width = inputSize;
                canvas.height = inputSize;
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }

                // Fill with white background
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, inputSize, inputSize);

                // Calculate scaling to fit
                const scale = Math.min(inputSize / img.width, inputSize / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                const x = (inputSize - w) / 2;
                const y = (inputSize - h) / 2;

                // Draw image letterboxed
                ctx.drawImage(img, x, y, w, h);

                const imageData = ctx.getImageData(0, 0, inputSize, inputSize);
                const { data } = imageData;

                // Prepare Float32 array for NCHW [1, 3, 224, 224]
                const float32Data = new Float32Array(1 * 3 * inputSize * inputSize);

                for (let i = 0; i < inputSize * inputSize; i++) {
                    // data is RGBA, ignore Alpha
                    const r = data[i * 4];
                    const g = data[i * 4 + 1];
                    const b = data[i * 4 + 2];

                    // Normalize and layout NCHW
                    // R channel
                    float32Data[i] = (r / 255.0 - mean[0]) / std[0];
                    // G channel
                    float32Data[inputSize * inputSize + i] = (g / 255.0 - mean[1]) / std[1];
                    // B channel
                    float32Data[2 * inputSize * inputSize + i] = (b / 255.0 - mean[2]) / std[2];
                }

                const tensor = new Tensor('float32', float32Data, [1, 3, inputSize, inputSize]);
                resolve({ tensor, dataUrl: canvas.toDataURL() }); // Return tensor and preview
            };
            img.onerror = reject;
            img.src = reader.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
