
import React, { useState } from 'react';
import { Radio, Wand2, RefreshCw, Music, Search, Info, ExternalLink } from 'lucide-react';
import { synthesizeMusicConcept, SynthesisResult } from '../services/geminiService';

const MusicLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [concept, setConcept] = useState<SynthesisResult | null>(null);

  const handleSynthesize = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const result = await synthesizeMusicConcept(prompt);
      setConcept(result);
    } catch (err) {
      setConcept({
        text: "Transmission error. The lab is currently offline.",
        sources: []
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="liquid-glass p-8 md:p-12 border border-white/10 flex flex-col lg:flex-row gap-12">
      <div className="flex-1 space-y-8">
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.4em] text-cyan-400">
            <Radio className="w-4 h-4" /> I. FREQUENCY INPUT
          </label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Find trending 2024 sad indie songs and explain how to edit them for a 'rainy late night drive' vibe..."
              className="w-full h-40 px-8 py-8 indented-glass text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/30 transition-all resize-none text-lg font-light leading-relaxed"
            />
          </div>
          <button
            onClick={handleSynthesize}
            disabled={loading || !prompt.trim()}
            className={`w-full py-6 rounded-2xl font-extrabold uppercase tracking-widest flex items-center justify-center gap-4 transition-all ${
              loading 
                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-cyan-400 hover:text-white shadow-[0_0_30px_rgba(0,255,255,0.3)] active:scale-95'
            }`}
          >
            {loading ? <RefreshCw className="animate-spin" /> : <Search className="w-5 h-5" />}
            {loading ? 'SYNTHESIZING VIBE...' : 'EXECUTE FREQUENCY SCAN'}
          </button>
        </div>

        <div className="p-6 indented-glass flex items-start gap-4">
          <Info className="w-6 h-6 text-purple-400 flex-shrink-0" />
          <p className="text-xs text-gray-400 font-medium leading-relaxed uppercase tracking-wider">
            Our AI Lab uses Google Search grounding to analyze real-time music trends and curate technical edit instructions for your next masterpiece.
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-[400px] flex flex-col space-y-4">
        <label className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.4em] text-purple-400">
          <Music className="w-4 h-4" /> II. CONCEPT ANALYSIS
        </label>
        <div className="flex-1 indented-glass p-8 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-white/10">
          {concept ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="prose prose-invert max-w-none text-gray-200 leading-relaxed font-light whitespace-pre-wrap">
                {concept.text}
              </div>
              
              {/* Grounding Sources extraction and display as per requirements */}
              {concept.sources && concept.sources.length > 0 && (
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-[0.4em]">RESEARCH SOURCES</div>
                  <div className="flex flex-wrap gap-3">
                    {concept.sources.map((source, idx) => (
                      <a 
                        key={idx} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 liquid-glass text-[9px] font-bold uppercase tracking-widest text-white/60 hover:text-cyan-400 hover:border-cyan-400/30 transition-all border border-white/5"
                      >
                        {source.title} <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
              <Wand2 className="w-16 h-16 text-gray-600" />
              <p className="text-xs font-bold uppercase tracking-[0.3em]">Awaiting Frequency Transmission</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicLab;
