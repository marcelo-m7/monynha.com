import React, { useState, useEffect } from 'react';

const PHRASES = [
  'Onde a Engenharia Encontra a Intuição.',
  'Automação Centrada no Humano.',
  'Criamos produtos digitais com impacto real.',
  'Estratégia, execução e crescimento sustentável.',
  'Transforme seu caos em faturamento.'
];

interface LandingProps {
  onStart: () => void;
  onExplore: () => void;
  onOpenContactForm: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart, onExplore, onOpenContactForm }) => {
  const [phrase, setPhrase] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setPhrase(PHRASES[Math.floor(Math.random() * PHRASES.length)]);
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 bg-[#171220] flex flex-col items-center justify-center p-4 text-center z-50 overflow-hidden transition-all duration-1000 ${isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <style>{`
        @keyframes floatingIcon { 0%, 100% { transform: translateY(0) rotate(-12deg); } 50% { transform: translateY(-12px) rotate(-8deg); } }
        .animate-float { animation: floatingIcon 6s ease-in-out infinite; }
        .landing-content-reveal { animation: slideUpReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @keyframes slideUpReveal { 0% { transform: translateY(30px); opacity: 0; filter: blur(5px); } 100% { transform: translateY(0); opacity: 1; filter: blur(0px); } }
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .landing-content-reveal { animation: none !important; }
        }
      `}</style>

      <div className="absolute top-[18%] left-[12%] w-12 h-12 sm:w-16 sm:h-16 border-[3px] border-primary rounded-xl bg-primary/5 flex items-center justify-center animate-float opacity-15 shadow-brutalist-purple" aria-hidden="true">
        <span className="material-icons text-primary text-2xl sm:text-4xl" aria-hidden="true">auto_awesome</span>
      </div>

      <section className={`max-w-3xl w-full space-y-6 sm:space-y-8 relative z-10 ${isReady ? 'landing-content-reveal' : 'opacity-0'}`} aria-labelledby="landing-title">
        <p className="inline-block px-3 py-1.5 border-2 border-primary rounded-full bg-primary/10 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary">{phrase}</p>

        <div className="space-y-4 sm:space-y-6">
          <h1 id="landing-title" className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[0.95] tracking-tighter text-white drop-shadow-xl break-words">
            MONYNHA <br />
            <span className="text-primary italic">SOFTWARES</span>
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl font-body text-white/80 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
            Conectamos engenharia, design e estratégia para transformar desafios operacionais em crescimento mensurável. <br className="hidden md:block" />
            Soluções digitais feitas para funcionar no dia a dia e escalar com consistência.
          </p>
        </div>

        <nav aria-label="Ações principais" className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 px-2 sm:px-4">
          <button onClick={onStart} className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 lg:py-4.5 bg-primary text-white text-base sm:text-lg md:text-xl font-bold rounded-xl border-2 border-near-black shadow-brutalist transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none focus-visible:ring-4 focus-visible:ring-primary/50 active:scale-95 flex items-center justify-center">
            Iniciar Diagnóstico
          </button>
          <button onClick={onExplore} className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 lg:py-4.5 bg-white text-near-black text-base sm:text-lg md:text-xl font-bold rounded-xl border-2 border-near-black shadow-brutalist transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none focus-visible:ring-4 focus-visible:ring-white/60 active:scale-95 flex items-center justify-center gap-2">
            <span>Conhecer a Monynha</span>
            <span className="material-icons text-base sm:text-lg" aria-hidden="true">biotech</span>
          </button>
        </nav>
        <button
          onClick={onOpenContactForm}
          className="mt-2 text-white/40 hover:text-white/80 transition-colors text-xs sm:text-sm font-bold uppercase tracking-widest underline underline-offset-4 decoration-white/20 hover:decoration-white/60 focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
        >
          ou envia uma mensagem →
        </button>
      </section>

      <footer className="fixed bottom-0 w-full p-3 sm:p-4 md:p-6 text-center text-white/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3">
          <p className="text-[9px] xs:text-[10px] sm:text-xs font-bold tracking-tight uppercase">Engenharia com personalidade. Monynha Softwares © {new Date().getFullYear()}</p>
          <nav aria-label="Redes sociais" className="flex gap-3 sm:gap-4 md:gap-6 text-[9px] xs:text-[10px] sm:text-xs font-bold">
            <a className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="https://github.com/Monynha-Softwares" target="_blank" rel="noopener noreferrer">GITHUB</a>
            <a className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="https://www.instagram.com/monynha_softwares/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
