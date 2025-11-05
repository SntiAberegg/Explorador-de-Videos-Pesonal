
import React from 'react';

interface NavigationDotsProps {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({ count, activeIndex, onDotClick }) => {
  return (
    <nav className="fixed right-[4vw] top-1/2 -translate-y-1/2 z-50">
      <ul className="flex flex-col gap-[2vh]">
        {Array.from({ length: count }).map((_, index) => (
          <li key={index}>
            <button
              aria-label={`Go to section ${index + 1}`}
              onClick={() => onDotClick(index)}
              className={`w-[clamp(12px,1vw,20px)] h-[clamp(12px,1vw,20px)] rounded-full border-2 border-white transition-all duration-300 hover:scale-125 ${
                activeIndex === index ? 'bg-white' : 'bg-transparent'
              }`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationDots;
   