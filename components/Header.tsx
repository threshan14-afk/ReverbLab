
import React from 'react';
import { Music2 } from 'lucide-react';
import { YOUTUBE_CHANNEL_URL } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 px-6 py-6 backdrop-blur-3xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="p-2.5 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl group-hover:rotate-6 transition-transform shadow-lg shadow-cyan-500/20">
            <Music2 className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-extrabold tracking-tighter">
            Reverb<span className="text-cyan-400 text-glow-cyan">Lab</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em]">
          <a href="#drops" className="hover:text-cyan-400 transition-colors">Drops</a>
          <a href="#ai-lab" className="hover:text-purple-400 transition-colors">The Lab</a>
          <a href="#requests" className="hover:text-cyan-400 transition-colors">Requests</a>
          <a 
            href={YOUTUBE_CHANNEL_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 liquid-glass hover:bg-white/10 transition-all text-white border-white/20"
          >
            Subscribe
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
