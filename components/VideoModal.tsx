
import React, { useEffect, useRef } from 'react';
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

  // Video element ref so we can control playback and cleanup
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // When the videoUrl changes (a new video is selected), try to play and ensure cleanup on unmount/close
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Attempt to play (may be blocked unless muted or user gesture exists) - silent failure is fine
    el.currentTime = 0;
    el.play().catch(() => {
      // autoplay may be blocked; user can still press play because controls are shown
    });

    return () => {
      // Pause and release source on cleanup
      try {
        el.pause();
        // Optional: remove src to free memory when modal closes
        // eslint-disable-next-line no-param-reassign
        el.removeAttribute('src');
      } catch (e) {
        // ignore
      }
    };
  }, [video.videoUrl]);

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

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center mb-[3vh]">
          <div className="absolute top-0 left-0 p-4 md:p-8 z-10 pointer-events-none">
            <h3 className="text-white font-bold text-lg md:text-2xl">{video.title}</h3>
          </div>
          <video
            ref={videoRef}
            controls
            autoPlay
            muted
            playsInline
            poster={video.thumbnail}
            className="relative w-full h-full object-contain bg-black"
          >
            {/* Use video.videoUrl directly; works with absolute URLs and with files served from public/ */}
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
