
import React from 'react';
import { Youtube, Instagram, Music, ArrowUp, Heart } from 'lucide-react';
import { YOUTUBE_CHANNEL_URL, INSTAGRAM_URL } from '../constants';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#02050a] border-t border-white/5 pt-32 pb-16 px-6 relative overflow-hidden">
      {/* Subtle background glow for footer */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl shadow-lg shadow-cyan-500/20">
                <Music className="w-6 h-6 text-black" />
              </div>
              <span className="text-4xl font-extrabold tracking-tighter">
                Reverb<span className="text-cyan-400">Lab</span>
              </span>
            </div>
            <p className="text-gray-500 max-w-sm text-lg font-light leading-relaxed">
              Finalizing the frequency. High-saturation nostalgia through the lens of liquid Cyber-Zen edits. 
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-extrabold tracking-[0.4em] uppercase opacity-50">STREAMS</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><a href="#drops" className="hover:text-cyan-400 transition-colors">Drops Archive</a></li>
              <li><a href="#ai-lab" className="hover:text-purple-400 transition-colors">Vibe Lab</a></li>
              <li><a href="#requests" className="hover:text-cyan-400 transition-colors">Request Line</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-extrabold tracking-[0.4em] uppercase opacity-50">DIVERSION</h4>
            <div className="flex gap-4">
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 liquid-glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all border-white/10">
                <Youtube className="w-5 h-5" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 liquid-glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-tr from-yellow-400 to-purple-600 transition-all border-white/10">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 liquid-glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500 transition-all border-white/10">
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-16 text-[10px] text-gray-600 font-bold tracking-[0.3em]">
          <p>© 2024 REVERBLAB • THE SOUND OF NOSTALGIA</p>
          
          <div className="flex items-center gap-10 mt-8 md:mt-0">
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              STREAM TOP <ArrowUp className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              CURATED BY <span className="text-cyan-400">THRESHAN</span> <Heart className="w-3 h-3 text-purple-500 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
