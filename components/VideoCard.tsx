import React, { useState, useEffect } from 'react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
  isActive: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick, isActive }) => {
  const [imageError, setImageError] = useState(false);

  // Reset error state when video source changes, so we retry loading the new image
  useEffect(() => {
    setImageError(false);
  }, [video.thumbnail]);

  return (
    <article
      onClick={onClick}
      className="group relative w-full h-full overflow-hidden bg-black flex items-center justify-center text-center transition-opacity duration-700 ease-in-out"
      style={{
        opacity: isActive ? 1 : 0,
        cursor: isActive ? 'pointer' : 'default',
      }}
      aria-label={`Play video: ${video.title}`}
      tabIndex={isActive ? 0 : -1}
    >
      {imageError ? (
        <div className="w-full h-full bg-white flex items-center justify-center">
          <p className="text-black/90" style={{fontSize: 'clamp(1rem, 2vw, 1.5rem)'}}>Portada del video</p>
        </div>
      ) : (
        <img 
          src={video.thumbnail} 
          alt={`Cover for ${video.title}`} 
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
      
      {/* The semi-transparent "Portada del video" text is now removed from the successful render path. */}
      
      <div 
        className="absolute inset-0 flex flex-col justify-end p-[clamp(1rem,3vh,2rem)_clamp(1rem,4vw,3rem)] bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        <h3 className="font-black uppercase text-white" style={{fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'}}>{video.title}</h3>
        <p className="text-white/80" style={{fontSize: 'clamp(1rem, 2vw, 1.25rem)'}}>{video.category} &bull; {video.duration}</p>
      </div>
    </article>
  );
};

export default VideoCard;