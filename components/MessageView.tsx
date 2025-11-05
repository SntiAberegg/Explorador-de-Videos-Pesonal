import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from './Icons';

// This makes TypeScript happy, as the emailjs script is loaded globally in index.html
declare const emailjs: any;

interface MessageViewProps {
  onClose: () => void;
}

const MessageView: React.FC<MessageViewProps> = ({ onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Auto-clear status message after a few seconds
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = () => {
    if (inputValue.trim() === '' || status === 'sending') {
      return;
    }
    
    setStatus('sending');
    setStatusMessage('Enviando...');

    // --- IMPORTANT: Replace with your own EmailJS credentials ---
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';
    // -----------------------------------------------------------

    const templateParams = {
      message: inputValue.trim(),
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response: any) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('success');
        setStatusMessage('Mensaje enviado con éxito.');
        setInputValue('');
      }, (error: any) => {
        console.log('FAILED...', error);
        setStatus('error');
        setStatusMessage('Error al enviar. Inténtelo de nuevo.');
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const getButtonText = () => {
    switch (status) {
        case 'sending': return 'ENVIANDO...';
        default: return 'ENVIAR';
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white p-[5vh_5vw] font-sans flex flex-col animate-fade-in z-[6000]">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; }
        textarea:focus { outline: none; }
      `}</style>
      
      <header className="absolute top-[3vh] right-[4vw] z-10">
        <button
            onClick={onClose}
            aria-label="Volver a la página principal"
            className="flex items-center justify-center w-[clamp(40px,4vw,60px)] h-[clamp(40px,4vw,60px)] bg-transparent transition-transform duration-300 hover:scale-125 hover:rotate-90 cursor-pointer select-none"
        >
            <X className="w-1/2 h-1/2" />
        </button>
      </header>

      <main className="w-full h-full flex flex-col justify-center items-center gap-8 max-w-4xl mx-auto">
        <div className="w-full flex-grow flex flex-col justify-end">
          <label htmlFor="message-input" className="font-black uppercase text-[clamp(1.5rem,3vw,2.5rem)] tracking-wider mb-4 select-none self-start">
            ESCRIBA SU MENSAJE...
          </label>
          <div className="relative w-full h-[50vh] min-h-64 border border-white/50">
             <textarea
              id="message-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-full bg-transparent resize-none p-4 text-[clamp(1rem,1.5vw,1.25rem)]"
              placeholder="Su mensaje será enviado al administrador del sitio."
            />
          </div>
        </div>

        <footer className="w-full flex-shrink-0 flex flex-col items-center">
             <button 
                onClick={handleSubmit} 
                className="flex items-center group disabled:opacity-50 disabled:cursor-wait"
                disabled={status === 'sending'}
             >
                <span className="font-black uppercase text-[clamp(1.2rem,2.5vw,2rem)] tracking-wider mr-2 group-hover:underline">{getButtonText()}</span>
                <ChevronRight className="w-[clamp(40px,5vw,70px)] h-[clamp(40px,5vw,70px)] group-hover:translate-x-2 transition-transform duration-300"/>
             </button>
             <div className="h-8 mt-2 text-center">
                {status !== 'idle' && (
                    <p className={`text-lg transition-opacity duration-300 ${status === 'success' ? 'text-white' : 'text-red-400'}`}>
                        {statusMessage}
                    </p>
                )}
             </div>
        </footer>
      </main>
    </div>
  );
};

export default MessageView;