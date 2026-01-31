import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Demo from './components/Demo';
import Performance from './components/Performance';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'demo' | 'performance'>('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-gray-900">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-grow">
        {activeTab === 'home' && <Home onStartDemo={() => setActiveTab('demo')} />}
        {activeTab === 'demo' && <Demo />}
        {activeTab === 'performance' && <Performance />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
