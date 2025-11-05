import React from 'react';
import { Video } from '../types';

interface CatalogCardProps {
  video: Video;
  onSelect: () => void;
  isSelected: boolean;
  onClick: () => void;
}

const CatalogCard: React.FC<CatalogCardProps> = ({ video, onSelect, isSelected, onClick }) => {
  return (
    <div
      className={`relative flex-shrink-0 w-48 h-28 md:w-64 md:h-36 lg:w-80 lg:h-44 bg-black rounded-sm overflow-hidden cursor-pointer transition-all duration-300 transform-gpu ${
        isSelected ? 'border-2 border-white scale-105' : 'border-2 border-transparent'
      }`}
      onMouseEnter={onSelect}
      onClick={onClick}
      aria-label={`Select video: ${video.title}`}
      tabIndex={0}
      role="button"
    >
      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2 md:p-3">
        <h3 className="font-bold text-white text-sm md:text-base uppercase tracking-wide truncate">{video.title}</h3>
      </div>
    </div>
  );
};

export default CatalogCard;