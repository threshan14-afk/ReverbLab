
import React from 'react';
import { ChevronDown, PlayCircle, Youtube } from 'lucide-react';
import { YOUTUBE_CHANNEL_URL } from '../constants';
import AudioVisualizer from './AudioVisualizer';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative z-10 space-y-12 max-w-5xl">
        <div className="space-y-4 flex flex-col items-center">
          <div className="px-5 py-2 liquid-glass text-[10px] font-extrabold tracking-[0.3em] uppercase text-cyan-400 border-white/20 animate-pulse">
            CYBER-ZEN SANCTUARY
          </div>
          <p className="text-purple-400/80 text-xs font-bold tracking-[0.4em] uppercase">Created by Threshan</p>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-8xl md:text-[10rem] font-extrabold tracking-tighter text-white leading-[0.85] flex flex-col items-center">
            REVERB<span className="text-glow-purple text-purple-500">LAB</span>
          </h1>
          <div className="flex items-center justify-center gap-6 text-2xl md:text-3xl font-light text-gray-400 italic tracking-wide">
            <span>Slowed.</span>
            <AudioVisualizer />
            <span>Reverb.</span>
            <AudioVisualizer />
            <span>Zen.</span>
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed opacity-80">
          Escape into the high-tech liquid soundscape. Curated for focus, nostalgia, and nocturnal clarity.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <a 
            href="#drops"
            className="group flex items-center gap-3 px-10 py-5 bg-white text-black font-extrabold rounded-full hover:bg-cyan-400 hover:text-white transition-all transform hover:scale-105 shadow-2xl shadow-cyan-500/20"
          >
            <PlayCircle className="w-5 h-5" />
            ENTER THE FLOW
          </a>
          <a 
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-10 py-5 liquid-glass border border-white/20 text-white font-extrabold rounded-full hover:bg-white/10 transition-all transform hover:scale-105"
          >
            <Youtube className="w-5 h-5 text-red-500" />
            OFFICIAL CHANNEL
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 animate-bounce opacity-40">
        <a href="#drops"><ChevronDown className="w-8 h-8 text-white" /></a>
      </div>
    </section>
  );
};

export default Hero;
