export const CLASSES = [
    'ba', 'ca', 'da', 'dha', 'ga',
    'ha', 'ja', 'ka', 'la', 'ma',
    'na', 'nga', 'nya', 'pa', 'ra',
    'sa', 'ta', 'tha', 'wa', 'ya'
];

export const MODEL_METADATA = {
    modelName: 'ResNet18 Fine-tuned',
    validationAccuracy: 0.986,
    f1Score: 0.986,
    totalClasses: 20,
    trainingSamples: 7996,
    validationSamples: 1999,
};

// 1. Proxy (solves CORS), 2. Release (fallback), 3. Direct (manual fallback)
// 1. Proxy (solves CORS), 2. Release (fallback), 3. Direct (manual fallback)
export const MODEL_URLS = [
    "/download-model",
];

export const MODEL_CONFIG = {
    inputSize: 224,
    mean: [0.485, 0.456, 0.406],
    std: [0.229, 0.224, 0.225],
};
