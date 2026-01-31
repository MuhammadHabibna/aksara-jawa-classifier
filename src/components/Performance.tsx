import { MODEL_METADATA, CLASSES } from '../config';

export default function Performance() {
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 animate-in fade-in duration-500 space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Model Performance & Dataset</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Overview dataset yang digunakan untuk training dan metrik evaluasi model ResNet18 fine-tuned.
                    Visualisasi dihasilkan secara offline dari notebook training.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Classes', value: MODEL_METADATA.totalClasses },
                    { label: 'Train Samples', value: MODEL_METADATA.trainingSamples },
                    { label: 'Val Samples', value: MODEL_METADATA.validationSamples },
                    { label: 'Val Accuracy', value: `${(MODEL_METADATA.validationAccuracy * 100).toFixed(1)}%` },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Dataset Classes */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Kelas Aksara (20)</h3>
                <div className="flex flex-wrap gap-2">
                    {CLASSES.map((cls) => (
                        <span key={cls} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-mono cursor-default hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                            {cls}
                        </span>
                    ))}
                </div>
            </div>

            {/* Metrics Visualization */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Confusion Matrix</h3>
                    <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
                        {/* Placeholder for metrics image */}
                        <img
                            src="/metrics/confusion_matrix.png"
                            alt="Confusion Matrix"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x600?text=Confusion+Matrix+Placeholder';
                            }}
                        />
                    </div>
                    <p className="text-sm text-gray-500 italic">
                        Visualisasi Confusion Matrix pada set validasi.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Per-class F1 Score</h3>
                    <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
                        {/* Placeholder for metrics image */}
                        <img
                            src="/metrics/f1_score.png"
                            alt="F1 Score"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/800x450?text=F1+Score+Placeholder';
                            }}
                        />
                    </div>
                    <p className="text-sm text-gray-500 italic">
                        F1-score metric untuk setiap kelas aksara.
                    </p>
                </div>
            </div>

            {/* Prediction Analysis */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">Analisis Prediksi Model</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-green-700">Contoh Prediksi Benar (True Positives)</h4>
                        <div className="aspect-auto bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-green-200 shadow-sm">
                            <img
                                src="/metrics/true_examples.png"
                                alt="True Predictions"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x600?text=True+Preds+Placeholder';
                                }}
                            />
                        </div>
                        <p className="text-sm text-gray-500">
                            Sampel gambar yang berhasil diprediksi dengan benar oleh model.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-red-700">Contoh Kesalahan (False Predictions)</h4>
                        <div className="aspect-auto bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-red-200 shadow-sm">
                            <img
                                src="/metrics/wrong_examples.png"
                                alt="Wrong Predictions"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x600?text=Wrong+Preds+Placeholder';
                                }}
                            />
                        </div>
                        <p className="text-sm text-gray-500">
                            Sampel gambar di mana model salah memprediksi (misprediksi).
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
