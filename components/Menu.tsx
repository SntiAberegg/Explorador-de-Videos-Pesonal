import React from 'react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'catalog' | 'message') => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const menuOptions = ['MENSAJE', 'CATALOGO', 'VOLVER'];

  const handleOptionClick = (option: string) => {
    switch (option) {
      case 'MENSAJE':
        onNavigate('message');
        break;
      case 'CATALOGO':
        onNavigate('catalog');
        break;
      case 'VOLVER':
        onClose();
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black z-[5000] flex flex-col items-center justify-evenly p-[5vh_5vw] transition-opacity duration-500 ease-in-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div className="group w-full text-center">
        {menuOptions.map((option) => (
          <div
            key={option}
            onClick={() => handleOptionClick(option)}
            className="font-black text-white uppercase cursor-pointer select-none transition-all duration-400 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] 
                       
                       text-6xl py-2
                       hover:bg-white hover:text-black
                       active:bg-white active:text-black
                       
                       md:text-[12vh] lg:text-[15vh]
                       md:py-0
                       md:hover:!bg-transparent md:hover:!text-white
                       md:active:!bg-transparent md:active:!text-white

                       md:group-hover:opacity-50 md:group-hover:text-[10vh] lg:group-hover:text-[12vh]
                       
                       md:hover:!opacity-100 md:hover:!text-[15vh] lg:hover:!text-[18vh]"
            style={{ letterSpacing: '0.05em' }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;