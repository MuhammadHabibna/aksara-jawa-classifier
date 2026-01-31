import clsx from 'clsx';


interface Prediction {
    label: string;
    prob: number;
}

interface PredictionResultProps {
    predictions: Prediction[];
    inferenceTime: number;
}

export default function PredictionResult({ predictions, inferenceTime }: PredictionResultProps) {
    if (predictions.length === 0) return null;

    const top1 = predictions[0];
    const percentage = (top1.prob * 100).toFixed(2);
    const color = top1.prob > 0.8 ? 'bg-green-500' : top1.prob > 0.5 ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full max-w-md">
            <div className="text-center mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Top Prediction</h3>
                <p className="text-4xl font-bold text-gray-900 mb-2">{top1.label}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                    {inferenceTime.toFixed(1)} ms
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">Confidence</span>
                        <span className="text-gray-900">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                            className={clsx("h-2.5 rounded-full transition-all duration-500", color)}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        *Confidence score is a probability estimate, not absolute correctness.
                    </p>
                </div>

                {predictions.length > 1 && (
                    <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Top 3 Candidates</h4>
                        <div className="space-y-2">
                            {predictions.slice(0, 3).map((pred, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <span className={clsx("font-medium", i === 0 ? "text-gray-900" : "text-gray-600")}>
                                        {i + 1}. {pred.label}
                                    </span>
                                    <span className="text-gray-500">{(pred.prob * 100).toFixed(1)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
