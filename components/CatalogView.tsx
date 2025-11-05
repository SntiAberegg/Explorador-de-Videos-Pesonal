import React, { useState, useRef } from 'react';
import { Video } from '../types';
import CatalogCard from './CatalogCard';
import { X, ChevronRight, ChevronLeft } from './Icons';

interface CatalogViewProps {
  videos: Video[];
  onClose: () => void;
  onVideoClick: (video: Video) => void;
}

const CatalogView: React.FC<CatalogViewProps> = ({ videos, onClose, onVideoClick }) => {
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(videos[0] || null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  
  if (!featuredVideo) {
    return (
        <div className="w-screen h-screen bg-black text-white flex flex-col items-center justify-center">
            <p>No videos available.</p>
            <button onClick={onClose} className="mt-4 p-2 border border-white">Go Back</button>
        </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-black text-white font-sans overflow-hidden animate-fade-in">
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; }

        .carousel-scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .carousel-scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
      
      <div className="absolute inset-0 z-0">
        <video
          key={featuredVideo.id}
          src={featuredVideo.videoUrl}
          className="w-full h-full object-cover transition-opacity duration-500"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <header className="flex justify-end p-[3vh_4vw]">
          <button
            onClick={onClose}
            aria-label="Close catalog"
            className="flex items-center justify-center w-[clamp(40px,4vw,60px)] h-[clamp(40px,4vw,60px)] bg-transparent transition-transform duration-300 hover:scale-125 hover:rotate-90 cursor-pointer select-none"
          >
            <X className="w-1/2 h-1/2" />
          </button>
        </header>

        <footer className="w-full pb-[3vh]">
          <div className="relative w-full max-w-screen-xl mx-auto px-[calc(max(4vw,20px)+2rem)]">
            <div
              ref={carouselRef}
              className="flex items-center space-x-4 overflow-x-auto carousel-scrollbar-hide py-4"
            >
              {videos.map(video => (
                <CatalogCard
                  key={video.id}
                  video={video}
                  isSelected={featuredVideo.id === video.id}
                  onSelect={() => setFeaturedVideo(video)}
                  onClick={() => onVideoClick(video)}
                />
              ))}
            </div>
            
            <button 
                onClick={() => handleScroll('left')} 
                aria-label="Scroll left"
                className="absolute top-1/2 -translate-y-1/2 left-[calc(max(4vw,20px)-1.5rem)] z-20 w-12 h-12 text-white opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
                <ChevronLeft className="w-full h-full" />
            </button>
            
            <button 
                onClick={() => handleScroll('right')} 
                aria-label="Scroll right"
                className="absolute top-1/2 -translate-y-1/2 right-[calc(max(4vw,20px)-1.5rem)] z-20 w-12 h-12 text-white opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
                <ChevronRight className="w-full h-full" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CatalogView;