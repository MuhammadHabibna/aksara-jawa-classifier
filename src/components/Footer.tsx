import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} Muhammad Habibna (@muhammadhabibna). <br className="hidden md:block" />
                        Built with React, Vite, Tailwind & ONNX Runtime Web.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="https://github.com/muhammadhabibna" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
                            <span className="sr-only">GitHub</span>
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://www.linkedin.com/in/muhammadhabibna" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
