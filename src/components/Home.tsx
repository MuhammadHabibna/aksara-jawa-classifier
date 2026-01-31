import { ArrowRight, CheckCircle } from 'lucide-react';

interface HomeProps {
    onStartDemo: () => void;
}

export default function Home({ onStartDemo }: HomeProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 sm:p-8 animate-in fade-in duration-500">
            <div className="max-w-3xl mx-auto text-center space-y-8">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight text-balance">
                    Aksara Jawa Classifier <br />
                    <span className="text-indigo-600">ResNet18 Fine-tuned</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Demo klasifikasi 20 kelas aksara Jawa menggunakan model ResNet18 yang dijalankan sepenuhnya di browser Anda. Cepat, privat, dan offline-ready.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={onStartDemo}
                        className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg hover:shadow-indigo-200 transition-all duration-200 flex items-center gap-2 text-lg"
                    >
                        Coba Model Sekarang <ArrowRight className="w-5 h-5" />
                    </button>
                    <a
                        href="https://github.com/muhammadhabibna"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-full transition-all duration-200"
                    >
                        Lihat Kode
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 text-left">
                    {[
                        { title: '98.6% Acc', desc: 'Akurasi validasi tinggi pada 20 kelas.' },
                        { title: 'Client-Side', desc: 'Inference berjalan lokal via ONNX Runtime Web.' },
                        { title: 'Privacy Focus', desc: 'Data gambar Anda tidak pernah dikirim ke server.' },
                    ].map((item, i) => (
                        <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <CheckCircle className="w-8 h-8 text-indigo-600 mb-3" />
                            <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                            <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
