
import React from 'react';

const AudioVisualizer: React.FC = () => {
  return (
    <div className="flex items-end gap-[3px] h-6">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="w-[3px] bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full"
          style={{
            animation: `wave 1s infinite ease-in-out`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes wave {
          0%, 100% { height: 4px; }
          50% { height: 24px; }
        }
      `}</style>
    </div>
  );
};

export default AudioVisualizer;
