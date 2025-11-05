import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { videoData } from './data/videos';
import { Video } from './types';
import SplashScreen from './components/SplashScreen';
import Menu from './components/Menu';
import Carousel from './components/Carousel';
import VideoModal from './components/VideoModal';
import CatalogView from './components/CatalogView';
import MessageView from './components/MessageView';
import { MenuIcon } from './components/Icons';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [view, setView] = useState<'main' | 'catalog' | 'message'>('main');

  const allVideos = useMemo(() => videoData.sections.flatMap(section => section.videos), []);
  const featuredVideos = useMemo(() => allVideos.slice(0, 3), [allVideos]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('splashShown')) {
        setShowSplash(false);
      } else {
        sessionStorage.setItem('splashShown', 'true');
        setTimeout(() => setShowSplash(false), 3500);
      }
    } catch (e) {
      setShowSplash(false);
    }
  }, []);
  
  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleNavigate = (targetView: 'catalog' | 'message') => {
    setView(targetView);
    setIsMenuOpen(false);
  };

  const currentVideo: Video = featuredVideos[activeVideoIndex];

  const getTitleStyle = (title: string): React.CSSProperties => {
    const length = title.length;
    let preferredVw = 20;
    
    if (length > 25) {
      preferredVw = 12;
    } else if (length > 15) {
      preferredVw = 15;
    }

    return { 
      fontSize: `clamp(3rem, ${preferredVw}vw, 18rem)`,
    };
  };

  if (showSplash) {
    return <SplashScreen />;
  }
  
  if (view === 'catalog') {
    return <CatalogView videos={allVideos} onClose={() => setView('main')} onVideoClick={handleVideoSelect} />;
  }

  if (view === 'message') {
    return <MessageView onClose={() => setView('main')} />;
  }

  return (
    <div className="bg-black text-white h-screen w-screen overflow-hidden font-sans flex flex-col">
      <main className="relative h-full w-full flex flex-col">
        {/* Menu Button */}
        <button
          onClick={toggleMenu}
          aria-label="Open menu"
          className="fixed top-[3vh] right-[4vw] z-[100] flex items-center justify-center w-[clamp(40px,4vw,60px)] h-[clamp(40px,4vw,60px)] bg-transparent transition-transform duration-300 hover:scale-125 cursor-pointer select-none"
        >
          <MenuIcon className="w-full h-full" />
        </button>

        {/* Dynamic Video Title */}
        <header className="flex-shrink-0 flex items-center justify-center text-center px-[4vw] pt-[2vh]">
          <h1 
            key={currentVideo.id} 
            className="font-black text-white uppercase break-words w-full leading-[0.85] tracking-tight animate-title-in"
            style={getTitleStyle(currentVideo.title)}
          >
            {currentVideo.title}
          </h1>
        </header>

        <style>{`
            @keyframes titleIn {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .animate-title-in {
              animation: titleIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
        `}</style>
        
        {/* Video Carousel */}
        <section className="relative w-full flex-grow flex items-center min-h-0 py-[2vh]">
          <Carousel 
            videos={featuredVideos} 
            onVideoSelect={handleVideoSelect}
            activeIndex={activeVideoIndex}
            onActiveIndexChange={setActiveVideoIndex}
          />
        </section>
      </main>

      <Menu isOpen={isMenuOpen} onClose={toggleMenu} onNavigate={handleNavigate} />
      {selectedVideo && <VideoModal video={selectedVideo} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;