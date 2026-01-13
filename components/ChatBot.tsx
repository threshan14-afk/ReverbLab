
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, Minus } from 'lucide-react';
import { startChatSession } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = async () => {
    if (!isOpen && !chatRef.current) {
      setLoading(true);
      chatRef.current = await startChatSession();
      setMessages([{ role: 'model', text: 'Welcome to the ReverbLab Sanctuary. How can I guide your nocturnal journey tonight?' }]);
      setLoading(false);
    }
    setIsOpen(!isOpen);
    setMinimized(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "The signal is weak. Try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={toggleChat}
        className="fixed bottom-8 right-8 w-16 h-16 liquid-glass flex items-center justify-center text-cyan-400 border-cyan-400/30 hover:scale-110 hover:rotate-6 transition-all z-[100] shadow-[0_0_20px_rgba(0,255,255,0.3)]"
      >
        <MessageSquare className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-8 right-8 w-[90vw] md:w-[400px] z-[100] transition-all duration-500 transform ${minimized ? 'h-[70px]' : 'h-[600px]'} flex flex-col liquid-glass overflow-hidden border-cyan-400/20`}>
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-black" />
          </div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase">Sanctuary AI</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setMinimized(!minimized)} className="p-2 hover:bg-white/10 rounded-lg"><Minus className="w-4 h-4" /></button>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-red-500/20 rounded-lg"><X className="w-4 h-4 text-red-400" /></button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-[20px] text-sm font-light leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-cyan-400 text-black font-bold' 
                    : 'indented-glass text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="indented-glass px-5 py-3 rounded-full flex gap-1">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-5 border-t border-white/10">
            <div className="relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about a mood..."
                className="w-full indented-glass px-6 py-4 pr-16 text-sm focus:outline-none focus:border-cyan-400/30 transition-all placeholder-gray-600"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-2 w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:bg-cyan-400 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
