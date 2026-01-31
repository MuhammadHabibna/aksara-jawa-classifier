import { useState, useEffect } from 'react';
import { loadModel, runInference, softmax, getTopK } from '../utils/inference';
import { preprocessImage } from '../utils/imageHelper';
import { CLASSES } from '../config';
import Dropzone from './Dropzone';
import PredictionResult from './PredictionResult';
import { Loader2 } from 'lucide-react';

export default function Demo() {
    const [modelStatus, setModelStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
    const [loadMessage, setLoadMessage] = useState<string>('');
    const [downloadProgress, setDownloadProgress] = useState<number>(0);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [preprocessingUrl, setPreprocessingUrl] = useState<string | null>(null);

    const [isInferencing, setIsInferencing] = useState(false);
    const [predictions, setPredictions] = useState<{ label: string, prob: number }[]>([]);
    const [inferenceTime, setInferenceTime] = useState(0);

    // Load model
    const initModel = async () => {
        try {
            setModelStatus('loading');
            setLoadMessage('Initializing session...');
            setDownloadProgress(0);

            await loadModel((msg, progress) => {
                setLoadMessage(msg);
                if (progress !== undefined) setDownloadProgress(progress);
            });

            setModelStatus('ready');
        } catch (e) {
            console.error(e);
            setModelStatus('error');
            setLoadMessage(`Failed to load model: ${e instanceof Error ? e.message : 'Unknown error'}`);
        }
    };

    useEffect(() => {
        initModel();
    }, []);

    const handleImageSelect = async (file: File) => {
        setImageFile(file);
        setPredictions([]);

        // Create simple preview
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    const handlePredict = async () => {
        if (!imageFile || modelStatus !== 'ready') return;

        try {
            setIsInferencing(true);

            // Preprocessing
            const startTime = performance.now();
            const { tensor, dataUrl } = await preprocessImage(imageFile);
            setPreprocessingUrl(dataUrl);

            // Inference
            const outputLogits = await runInference(tensor);

            // Post-processing
            const probs = softmax(outputLogits);
            const topK = getTopK(probs, 5, CLASSES);

            const endTime = performance.now();
            setInferenceTime(endTime - startTime);
            setPredictions(topK);

        } catch (e) {
            console.error(e);
            alert('Error during inference. See console.');
        } finally {
            setIsInferencing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Demo Model</h2>
                <p className="text-gray-500 mt-2">Upload gambar aksara Jawa untuk diklasifikasi.</p>

                {/* Model Status Indicator */}
                <div className="mt-4 flex flex-col items-center justify-center gap-3 text-sm min-h-[40px]">
                    {modelStatus === 'loading' && (
                        <div className="flex flex-col items-center gap-2 w-full max-w-md">
                            <span className="flex items-center text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                                <Loader2 className="w-3 h-3 mr-2 animate-spin" /> {loadMessage}
                            </span>
                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${downloadProgress}%` }}
                                ></div>
                            </div>
                            <span className="text-xs text-gray-500">{downloadProgress}%</span>
                        </div>
                    )}
                    {modelStatus === 'ready' && (
                        <span className="flex items-center text-green-700 bg-green-50 px-3 py-1 rounded-full font-medium animate-in fade-in">
                            Model Loaded & Ready
                        </span>
                    )}
                    {modelStatus === 'error' && (
                        <div className="flex flex-col items-center gap-2 max-w-lg text-center">
                            <span className="text-red-800 bg-red-100 px-3 py-1 rounded-full font-medium">
                                Failed to load model
                            </span>
                            <pre className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200 whitespace-pre-wrap break-words w-full text-left font-mono">
                                {loadMessage}
                            </pre>
                            <button
                                onClick={initModel}
                                className="text-sm px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-semibold shadow-sm transition-colors mt-2"
                            >
                                Try Again / Retry
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left Column: Input */}
                <div className="space-y-6">
                    <Dropzone onImageSelect={handleImageSelect} />

                    {previewUrl && (
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
                            <h3 className="font-semibold text-gray-700">Preview</h3>
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative">
                                <img src={previewUrl} alt="Upload" className="max-w-full max-h-full object-contain" />
                            </div>

                            <button
                                onClick={handlePredict}
                                disabled={isInferencing || modelStatus !== 'ready'}
                                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-lg transition-colors flex justify-center items-center"
                            >
                                {isInferencing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Prediksi...
                                    </>
                                ) : (
                                    "Prediksi Sekarang"
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column: Results */}
                <div className="space-y-6">
                    {predictions.length > 0 ? (
                        <PredictionResult predictions={predictions} inferenceTime={inferenceTime} />
                    ) : (
                        <div className="h-full min-h-[300px] flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                            <div>
                                <p>Hasil prediksi akan muncul di sini.</p>
                            </div>
                        </div>
                    )}

                    {/* Preprocessing Debug Info */}
                    {preprocessingUrl && predictions.length > 0 && (
                        <details className="text-xs text-gray-500 cursor-pointer">
                            <summary className="hover:text-gray-700 mb-2">Lihat Preprocessing (224x224)</summary>
                            <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200 inline-block">
                                <img src={preprocessingUrl} alt="Preprocessed" className="w-[112px] h-[112px]" />
                            </div>
                        </details>
                    )}
                </div>
            </div>
        </div>
    );
}
