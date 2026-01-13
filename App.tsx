
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VideoGrid from './components/VideoGrid';
import VibeSelector from './components/VibeSelector';
import MusicLab from './components/MusicLab';
import RequestForm from './components/RequestForm';
import Footer from './components/Footer';
import SakuraParticles from './components/SakuraParticles';
import ChatBot from './components/ChatBot';
import { Vibe } from './types';

const App: React.FC = () => {
  const [selectedVibe, setSelectedVibe] = useState<Vibe>('Midnight Drive');

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = (this as HTMLAnchorElement).getAttribute('href');
        if (targetId) {
          document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen selection:bg-cyan-400/30 relative">
      {/* Layer -2: Background Liquid Orbs */}
      <div className="orb-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>

      {/* Layer -1: Sakura Middle Layer */}
      <SakuraParticles />

      {/* Layer 0: Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          
          <section id="drops" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="mb-20 space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <div className="inline-block px-4 py-1.5 liquid-glass border-white/20 text-[10px] font-extrabold uppercase tracking-[0.4em] text-cyan-400">
                    ATMOSPHERIC ARCHIVE
                  </div>
                  <h2 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-white leading-none">
                    NOCTURNAL <span className="text-glow-purple text-purple-500">DROPS</span>
                  </h2>
                </div>
              </div>
            </div>
            
            <VibeSelector selected={selectedVibe} onSelect={setSelectedVibe} />
            
            <div className="min-h-[600px] animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <VideoGrid filter={selectedVibe} />
            </div>
          </section>

          <section id="ai-lab" className="py-32 px-6 bg-black/20">
            <div className="max-w-7xl mx-auto">
              <div className="mb-20 space-y-4 text-center flex flex-col items-center">
                <div className="inline-block px-4 py-1.5 liquid-glass border-white/20 text-[10px] font-extrabold uppercase tracking-[0.4em] text-purple-400 mb-4">
                  AI SYNTHESIZER
                </div>
                <h2 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-white leading-none">
                  THE MUSIC <span className="text-glow-cyan text-cyan-400">LAB</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light italic mt-6">
                  "Analyze frequencies and synthesize nocturnal soundscapes using Gemini Search intelligence."
                </p>
              </div>
              <MusicLab />
            </div>
          </section>

          <section id="requests" className="py-32 px-6 max-w-7xl mx-auto">
            <RequestForm />
          </section>
        </main>
        <Footer />
      </div>

      <ChatBot />
    </div>
  );
};

export default App;
