
import React, { useState } from 'react';
import { Send, Music } from 'lucide-react';

const RequestForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="liquid-glass p-16 border border-white/10 relative overflow-hidden group">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] group-hover:scale-150 transition-transform duration-[3s]" />
      
      <div className="relative z-10 max-w-3xl">
        <h2 className="text-6xl font-extrabold tracking-tighter mb-8 leading-none">
          REQUEST <span className="text-cyan-400 text-glow-cyan">LINE</span>
        </h2>
        <p className="text-gray-400 text-xl mb-12 max-w-xl font-light italic leading-relaxed">
          Which soundscape should we explore next? Feed the lab with your frequency requests.
        </p>

        {submitted ? (
          <div className="indented-glass p-16 text-center animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-cyan-500/30">
              <Send className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-3xl font-bold mb-3 tracking-tight">TRANSMISSION COMPLETE</h3>
            <p className="text-gray-400 uppercase text-[10px] font-bold tracking-[0.3em]">Queued for Lab Synthesis</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-[0.3em]">Song Identity</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Midnight City"
                  className="w-full indented-glass px-8 py-5 focus:outline-none focus:border-cyan-400/30 transition-all text-white placeholder-gray-600"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-extrabold text-purple-400 uppercase tracking-[0.3em]">Artist Origin</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. M83"
                  className="w-full indented-glass px-8 py-5 focus:outline-none focus:border-purple-400/30 transition-all text-white placeholder-gray-600"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-[0.3em]">Vibe Instructions</label>
              <textarea 
                placeholder="e.g. Heavy atmospheric rain, deep sub-bass..."
                className="w-full indented-glass px-8 py-6 h-40 focus:outline-none focus:border-white/10 transition-all resize-none text-white placeholder-gray-600"
              />
            </div>

            <button 
              type="submit"
              className="px-14 py-6 bg-white text-black font-extrabold rounded-[20px] hover:bg-cyan-400 hover:text-white transition-all flex items-center gap-4 shadow-2xl shadow-cyan-500/20 active:scale-95 uppercase tracking-widest text-xs"
            >
              <Music className="w-5 h-5" />
              INITIATE REQUEST
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestForm;
