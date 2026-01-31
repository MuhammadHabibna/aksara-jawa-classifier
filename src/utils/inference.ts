import * as ort from 'onnxruntime-web';
import { Tensor } from 'onnxruntime-web';
import { MODEL_CONFIG } from '../config';

// Configure ONNX Runtime to use Wasm backend
ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.23.2/dist/';
// Note: Using CDN is safer for static deployment if copying wasm files is tricky, 
// but we can also copy them. For now, CDN is reliable for demo.

let session: ort.InferenceSession | null = null;

export async function loadModel(onProgress?: (msg: string) => void): Promise<ort.InferenceSession> {
    if (session) {
        onProgress?.("Model already loaded from cache");
        return session;
    }

    try {
        onProgress?.("Downloading model... (this may take a while initially)");

        // Explicitly fetching to show progress could be added, but passing url to create works too.
        session = await ort.InferenceSession.create(MODEL_CONFIG.modelPath, {
            executionProviders: ['wasm'],
            graphOptimizationLevel: 'all',
        });

        onProgress?.("Model loaded successfully");
        return session;
    } catch (e) {
        console.error("Failed to load model", e);
        throw new Error("Failed to load the model. Please check your network or if model.onnx exists.");
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
