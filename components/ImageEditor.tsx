
import React, { useState, useRef } from 'react';
import { Sparkles, Upload, Wand2, RefreshCw, Download, AlertCircle } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setLoading(true);
    setError(null);
    try {
      const edited = await editImageWithGemini(image, prompt);
      if (edited) setResult(edited);
      else throw new Error("Synthesis incomplete.");
    } catch (err: any) {
      setError(err.message || "Synthesizer error. Verification needed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="liquid-glass p-10 border border-white/10 flex flex-col lg:flex-row gap-16">
      <div className="flex-1 space-y-8">
        <div className="space-y-4">
          <label className="block text-[10px] font-extrabold uppercase tracking-[0.3em] text-cyan-400">
            I. SOURCE INPUT
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`aspect-video relative cursor-pointer border-2 border-dashed rounded-[30px] flex flex-col items-center justify-center transition-all ${
              image ? 'border-cyan-500/50' : 'border-white/10 hover:border-white/20'
            }`}
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover rounded-[28px] opacity-70" alt="Preview" />
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 liquid-glass flex items-center justify-center mx-auto">
                  <Upload className="text-cyan-400 w-6 h-6" />
                </div>
                <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Inject Data Stream</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-extrabold uppercase tracking-[0.3em] text-purple-400">
            II. VIBE PARAMETERS
          </label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Liquid emerald texture, 3am rain drive..."
              className="w-full h-32 px-6 py-6 indented-glass text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/50 transition-all resize-none"
            />
          </div>
          <button
            onClick={handleEdit}
            disabled={!image || !prompt || loading}
            className={`w-full py-5 rounded-[20px] font-extrabold uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
              loading 
                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-cyan-400 hover:text-white shadow-xl shadow-cyan-500/20 active:scale-95'
            }`}
          >
            {loading ? <RefreshCw className="animate-spin" /> : <Wand2 />}
            {loading ? 'SYNTHESIZING...' : 'EXECUTE VIBE'}
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-8">
        <label className="block text-[10px] font-extrabold uppercase tracking-[0.3em] text-cyan-400">
          III. OUTPUT CLARITY
        </label>
        <div className="aspect-video relative rounded-[30px] overflow-hidden flex items-center justify-center border border-white/10 indented-glass">
          {result ? (
            <img src={result} className="w-full h-full object-cover" alt="Result" />
          ) : (
            <div className="text-center p-8 space-y-4">
              <Sparkles className="w-12 h-12 text-gray-800 mx-auto" />
              <p className="text-gray-600 text-xs font-bold tracking-widest uppercase">Awaiting Stream</p>
            </div>
          )}
          
          {result && !loading && (
            <div className="absolute bottom-6 right-6 flex gap-3">
              <button 
                onClick={() => { const l = document.createElement('a'); l.href = result; l.download = 'vibe.png'; l.click(); }}
                className="p-4 liquid-glass hover:bg-cyan-400 hover:text-black transition-all"
              >
                <Download className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {setResult(null); setImage(null); setPrompt('');}}
                className="p-4 liquid-glass hover:bg-purple-500 transition-all"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        
        {error && (
          <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400 text-xs font-bold tracking-widest uppercase">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;
