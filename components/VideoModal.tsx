
import React, { useEffect } from 'react';
import { Video } from '../types';
import { X } from './Icons';

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/95 z-[2000] flex items-center justify-center p-[5vh_5vw] animate-fade-in"
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-in-out forwards; }
      `}</style>
      
      <div className="relative w-full max-w-6xl max-h-full flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close video player"
          className="absolute top-[-8vh] right-0 flex items-center justify-center w-[clamp(50px,6vw,80px)] h-[clamp(50px,6vw,80px)] bg-transparent text-white transition-all duration-300 hover:scale-125 hover:rotate-90 cursor-pointer select-none"
        >
          <X className="w-1/2 h-1/2"/>
        </button>

        {/* Video Player Placeholder */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center mb-[3vh]">
          <div className="absolute top-0 left-0 p-4 md:p-8 z-10 pointer-events-none">
            <h3 className="text-white font-bold text-lg md:text-2xl">{video.title}</h3>
          </div>
          <span className="text-white/50 text-lg">Video Player Not Implemented</span>
        </div>

        {/* Video Information */}
        <div className="text-center text-white w-full">
          <p className="text-[clamp(14px,1.4vw,22px)] opacity-70 mt-2">{video.category} &bull; {video.duration}</p>
          <p className="text-[clamp(16px,1.6vw,26px)] leading-normal mt-4 max-w-3xl mx-auto">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
