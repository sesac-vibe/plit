'use client';

import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useState } from 'react';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export function Controls({ isPlaying, onPlayPause, onPrev, onNext, canGoPrev, canGoNext }: ControlsProps) {
  const [hovered, setHovered] = useState<'prev' | 'play' | 'next' | null>(null);

  const getOpacity = (button: 'prev' | 'play' | 'next') => {
    return hovered && hovered !== button ? 0.4 : 1;
  };

  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-5">
      <button
        onClick={onPrev}
        onMouseEnter={() => setHovered('prev')}
        onMouseLeave={() => setHovered(null)}
        disabled={!canGoPrev}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)',
          border: '0.5px solid rgba(255, 255, 255, 0.8)',
          opacity: getOpacity('prev'),
          transition: 'all 100ms',
        }}
        className="w-[60px] h-[60px] rounded-full flex items-center justify-center hover:scale-105 active:scale-[0.80] disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer outline-none"
      >
        <ChevronLeft className="w-7 h-7 text-blue-400" strokeWidth={2.5} />
      </button>

      <button
        onClick={onPlayPause}
        onMouseEnter={() => setHovered('play')}
        onMouseLeave={() => setHovered(null)}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)',
          border: '0.5px solid rgba(255, 255, 255, 0.8)',
          opacity: getOpacity('play'),
          transition: 'all 100ms',
        }}
        className="w-[60px] h-[60px] rounded-full flex items-center justify-center hover:scale-105 active:scale-[0.92] cursor-pointer outline-none"
      >
        {isPlaying ? (
          <Pause className="w-7 h-7 text-blue-400 transition-all duration-200" strokeWidth={0} fill="currentColor" />
        ) : (
          <Play className="w-7 h-7 text-blue-400 ml-0.5 transition-all duration-200" strokeWidth={0} fill="currentColor" />
        )}
      </button>

      <button
        onClick={onNext}
        onMouseEnter={() => setHovered('next')}
        onMouseLeave={() => setHovered(null)}
        disabled={!canGoNext}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)',
          border: '0.5px solid rgba(255, 255, 255, 0.8)',
          opacity: getOpacity('next'),
          transition: 'all 100ms',
        }}
        className="w-[60px] h-[60px] rounded-full flex items-center justify-center hover:scale-105 active:scale-[0.80] disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer outline-none"
      >
        <ChevronRight className="w-7 h-7 text-blue-400" strokeWidth={2.5} />
      </button>
    </div>
  );
}
