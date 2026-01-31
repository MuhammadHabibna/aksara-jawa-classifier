import * as ort from 'onnxruntime-web';
import { Tensor } from 'onnxruntime-web';
import { MODEL_URL } from '../config';

// Configure ONNX Runtime to use Wasm backend
ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.23.2/dist/';
// Note: Using CDN is safer for static deployment if copying wasm files is tricky, 
// but we can also copy them. For now, CDN is reliable for demo.

let session: ort.InferenceSession | null = null;

export async function loadModel(onProgress?: (msg: string, progress?: number) => void): Promise<ort.InferenceSession> {
    if (session) {
        onProgress?.("Model already loaded from cache", 100);
        return session;
    }

    try {
        onProgress?.("Initiating download...", 0);

        const response = await fetch(MODEL_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch model: ${response.status} ${response.statusText}`);
        }

        const contentLength = response.headers.get('content-length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;
        let loaded = 0;

        const reader = response.body?.getReader();
        if (!reader) throw new Error("ReadableStream not supported in this browser.");

        const chunks: Uint8Array[] = [];

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            if (value) {
                chunks.push(value);
                loaded += value.length;
                if (total > 0) {
                    const percent = Math.round((loaded / total) * 100);
                    onProgress?.(`Downloading... ${percent}%`, percent);
                } else {
                    const mb = (loaded / 1024 / 1024).toFixed(1);
                    onProgress?.(`Downloading... ${mb}MB`, 0);
                }
            }
        }

        // Concatenate chunks
        const modelBuffer = new Uint8Array(loaded);
        let offset = 0;
        for (const chunk of chunks) {
            modelBuffer.set(chunk, offset);
            offset += chunk.length;
        }

        onProgress?.("Initializing inference session...", 100); // UI should allow spinning here

        session = await ort.InferenceSession.create(modelBuffer, {
            executionProviders: ['wasm'],
            graphOptimizationLevel: 'all',
        });

        onProgress?.("Model loaded successfully", 100);
        return session;
    } catch (e) {
        session = null;
        console.error("Failed to load model", e);
        throw e; // Re-throw to be handled by caller
    }
}

export async function runInference(inputTensor: Tensor): Promise<Float32Array> {
    if (!session) {
        throw new Error("Model not loaded");
    }

    const feeds: Record<string, Tensor> = {};
    const inputNames = session.inputNames;

    // Assume first input is the image
    feeds[inputNames[0]] = inputTensor;

    const results = await session.run(feeds);
    const outputNames = session.outputNames;
    const output = results[outputNames[0]].data as Float32Array;

    return output;
}

export function softmax(logits: Float32Array): Float32Array {
    const exps = logits.map((val) => Math.exp(val));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    return exps.map((val) => val / sumExps);
}

export function getTopK(probabilities: Float32Array, k: number, classes: string[]) {
    const indexed = Array.from(probabilities).map((prob, index) => ({ prob, index, label: classes[index] }));
    indexed.sort((a, b) => b.prob - a.prob);
    return indexed.slice(0, k);
}
