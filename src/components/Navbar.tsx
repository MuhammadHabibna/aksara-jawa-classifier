import { Code2, Cpu, BarChart3 } from 'lucide-react';
import clsx from 'clsx';

interface NavbarProps {
    activeTab: 'home' | 'demo' | 'performance';
    onTabChange: (tab: 'home' | 'demo' | 'performance') => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
    const navItems = [
        { id: 'home', label: 'Home', icon: Code2 },
        { id: 'demo', label: 'Demo Model', icon: Cpu },
        { id: 'performance', label: 'Performa & Dataset', icon: BarChart3 },
    ] as const;

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange('home')}>
                        <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                            <span className="font-bold text-xl">AJ</span>
                        </div>
                        <span className="font-bold text-gray-900 text-lg hidden sm:block">Aksara Jawa Classifier</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onTabChange(item.id)}
                                    className={clsx(
                                        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2",
                                        isActive
                                            ? "bg-indigo-50 text-indigo-700 shadow-sm"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden sm:inline">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
