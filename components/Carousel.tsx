import React, { useState, useEffect, useCallback } from 'react';
import { Video } from '../types';
import VideoCard from './VideoCard';
import { ChevronLeft, ChevronRight } from './Icons';

interface CarouselProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
  activeIndex: number;
  onActiveIndexChange: (index: number | ((prevIndex: number) => number)) => void;
}

const Carousel: React.FC<CarouselProps> = ({ videos, onVideoSelect, activeIndex, onActiveIndexChange }) => {

  const navigate = useCallback((direction: number) => {
    onActiveIndexChange(prev => {
      const newIndex = prev + direction;
      if (newIndex < 0) return 0;
      if (newIndex >= videos.length) return videos.length - 1;
      return newIndex;
    });
  }, [videos.length, onActiveIndexChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full max-w-[1600px] mx-auto">
        
        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none"></div>

        {/* Video covers container */}
        <div className="absolute inset-0 overflow-hidden">
            {videos.map((video, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={video.id}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                      transform: `translateX(${(index - activeIndex) * 100}%)`,
                      transition: 'transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  aria-hidden={!isActive}
                >
                  <VideoCard
                    video={video}
                    onClick={() => isActive && onVideoSelect(video)}
                    isActive={isActive}
                  />
                </div>
              )
            })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
          onClick={() => navigate(-1)} 
          aria-label="Previous video"
          disabled={activeIndex === 0}
          className="absolute top-1/2 -translate-y-1/2 left-[calc(max(4vw,20px))] z-20 w-[clamp(40px,5vw,70px)] h-[clamp(40px,5vw,70px)] text-white opacity-20 hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed transition-opacity duration-300"
      >
          <ChevronLeft className="w-full h-full" />
      </button>
      
      <button 
          onClick={() => navigate(1)} 
          aria-label="Next video"
          disabled={activeIndex >= videos.length - 1}
          className="absolute top-1/2 -translate-y-1/2 right-[calc(max(4vw,20px))] z-20 w-[clamp(40px,5vw,70px)] h-[clamp(40px,5vw,70px)] text-white opacity-20 hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed transition-opacity duration-300"
      >
          <ChevronRight className="w-full h-full" />
      </button>
    </div>
  );
};

export default Carousel;