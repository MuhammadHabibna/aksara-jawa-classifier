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

export const MODEL_URL = "https://github.com/MuhammadHabibna/aksara-jawa-classifier/releases/download/model-v1/aksara_jawa_resnet18.onnx";

export const MODEL_CONFIG = {
    inputSize: 224,
    mean: [0.485, 0.456, 0.406],
    std: [0.229, 0.224, 0.225],
};
