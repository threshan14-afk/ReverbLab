
import React from 'react';
import { VIBES } from '../constants';
import { Vibe } from '../types';

interface VibeSelectorProps {
  selected: Vibe;
  onSelect: (vibe: Vibe) => void;
}

const VibeSelector: React.FC<VibeSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="relative mb-20 overflow-visible">
      <div className="flex items-center overflow-x-auto no-scrollbar gap-6 px-4 pb-8 snap-x">
        {VIBES.map((vibe) => (
          <button
            key={vibe}
            onClick={() => onSelect(vibe)}
            className={`whitespace-nowrap px-10 py-5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.3em] transition-all border snap-center flex-shrink-0 ${
              selected === vibe
                ? 'bg-cyan-400 border-cyan-400 text-black shadow-[0_0_25px_rgba(0,255,255,0.6)] active-tab-glow scale-105'
                : 'liquid-glass border-white/10 text-white/60 hover:border-white/40 hover:text-white opacity-70 hover:opacity-100 hover:scale-105'
            }`}
          >
            {vibe}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VibeSelector;
