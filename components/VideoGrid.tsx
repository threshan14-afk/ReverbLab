
import React from 'react';
import { VIDEO_DROPS } from '../constants';
import { Vibe } from '../types';
import { ExternalLink, Play } from 'lucide-react';

interface VideoGridProps {
  filter: Vibe;
}

const VideoGrid: React.FC<VideoGridProps> = ({ filter }) => {
  const filteredVideos = filter === 'All' 
    ? VIDEO_DROPS 
    : VIDEO_DROPS.filter(v => v.vibe === filter);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {filteredVideos.map((video) => (
        <div 
          key={video.id} 
          className="group relative liquid-glass p-4 hover-float border border-white/10 overflow-hidden"
        >
          {/* Thumbnail Container */}
          <div className="aspect-video relative rounded-2xl overflow-hidden mb-6">
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] opacity-70 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <a 
                href={`https://youtube.com/watch?v=${video.youtubeId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-cyan-400 hover:text-black hover:scale-110 transition-all"
              >
                <Play className="w-8 h-8 fill-current" />
              </a>
            </div>

            <div className="absolute top-4 left-4 px-4 py-1.5 liquid-glass text-[9px] font-bold uppercase tracking-widest text-cyan-300 border-cyan-500/30">
              {video.vibe}
            </div>
          </div>

          <div className="px-2 pb-2 space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight line-clamp-1 group-hover:text-cyan-400 transition-colors">
              {video.title}
            </h3>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Master Edit</span>
              <a 
                href={`https://youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-purple-400 font-extrabold uppercase tracking-widest flex items-center gap-1.5 hover:text-purple-300 transition-colors"
              >
                YouTube <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
