
import React, { useState, useEffect, useRef } from 'react';

const STATUS_MESSAGES = [
  "Identificando gargalos, mona...",
  "Analisando o caos operacional com carinho...",
  "Preparando um diagnóstico babadeiro...",
  "Sintonizando vibes corporativas de alto nível...",
  "Otimizando tua estratégia pra você brilhar...",
  "Praticando branding consciente e queer...",
  "Consultando as cartas do faturamento...",
  "Finalizando o plano que vai mudar tua vida!",
  "Quase lá, respira e brilha...",
  "Escaneando o LinkedIn do seu ex pra evitar gatilhos...",
  "Descriptografando o segredo do sucesso (spoiler: é você)...",
  "Removendo impurezas do seu funil de vendas...",
  "Adicionando 15% de glitter extra no seu roadmap..."
];

const FAKE_LOGS = [
  "> [SYSTEM] Booting Monynha-AI-V3...",
  "> [SEARCH] Crawling digital presence...",
  "> [ANALYSIS] Semantic mapping of struggle...",
  "> [BRAND] Detecting pride level: HIGH",
  "> [TECH] Refactoring business logic...",
  "> [VIBE] Calibrating aesthetic resistance...",
  "> [AI] Grounding results with Google Search...",
  "> [SUCCESS] Generating 100k mindset...",
  "> [FINISH] Dressing plan in its best outfit..."
];

interface LoadingScreenProps {
  isDone?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isDone }) => {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [burstActive, setBurstActive] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => setPrefersReducedMotion(mediaQuery.matches);

    updateReducedMotion();
    mediaQuery.addEventListener('change', updateReducedMotion);
    return () => mediaQuery.removeEventListener('change', updateReducedMotion);
  }, []);

  useEffect(() => {
    if (isDone) {
      setProgress(100);
      setShowConfetti(!prefersReducedMotion);
      setBurstActive(!prefersReducedMotion);
      return;
    }

    // Progress logic
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) return 99;
        const remaining = 100 - prev;
        const increment = Math.random() * (remaining / 10);
        return Math.min(prev + increment, 99);
      });
    }, 400);

    // Status message cycling
    const msgInterval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % STATUS_MESSAGES.length);
    }, 1500);

    // Log scrolling logic
    const logInterval = setInterval(() => {
      setLogs(prev => {
        const nextLog = FAKE_LOGS[Math.floor(Math.random() * FAKE_LOGS.length)];
        const newLogs = [...prev, nextLog];
        return newLogs.slice(-5);
      });
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
      clearInterval(logInterval);
    };
  }, [isDone, prefersReducedMotion]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const getPhase = () => {
    if (isDone) return "CONCLUÍDO: CLOSE CERTO!";
    if (progress < 30) return "Fase 1: Escaneamento de Alma";
    if (progress < 60) return "Fase 2: Processamento de Close";
    if (progress < 90) return "Fase 3: Refino Estratégico";
    return "Fase Final: Montando o Look do Sucesso";
  };

  return (
    <div className="fixed inset-0 bg-[#FAFAFC] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 md:py-10 z-[60] overflow-hidden">
      <style>{`
        @keyframes burst-out {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.2); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) translateX(20vw) rotate(720deg); opacity: 0; }
        }
        @keyframes flutter-loading {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(70deg); }
        }
        @keyframes fairy-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fairy-victory {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.5) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        @keyframes fairy-exit {
          0% { transform: scale(1) translateY(0); opacity: 1; }
          100% { transform: scale(2) translateY(-100px) rotate(720deg); opacity: 0; }
        }
        .magic-burst {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, #9767e4 0%, transparent 70%);
          pointer-events: none;
          animation: burst-out 0.8s ease-out forwards;
        }
        .confetti-piece {
          position: fixed;
          top: -20px;
          z-index: 100;
          pointer-events: none;
          animation: confetti-fall linear forwards;
        }
        .fairy-body-loading {
          width: 10px;
          height: 10px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 15px 5px #9767e4, 0 0 30px 10px rgba(151, 103, 228, 0.4);
          z-index: 2;
        }
        .wing-loading {
          position: absolute;
          width: 16px;
          height: 24px;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(1px);
          border: 0.5px solid rgba(255, 255, 255, 0.5);
          border-radius: 50% 50% 30% 70%;
          animation: flutter-loading 0.1s infinite;
          top: -8px;
        }
        .wing-loading-left { right: 50%; margin-right: 4px; transform-origin: center right; }
        .wing-loading-right { left: 50%; margin-left: 4px; transform: scaleX(-1); transform-origin: center left; }
        @media (prefers-reduced-motion: reduce) {
          .confetti-piece,
          .magic-burst,
          .wing-loading,
          .animate-pulse,
          .animate-bounce,
          .animate-ping,
          .animate-spin { animation: none !important; }
        }
      `}</style>

      {/* Confetti Rain on Completion */}
      {showConfetti && [...Array(56)].map((_, i) => {
        const size = Math.random() * 12 + 6;
        const color = ['#9767e4', '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#FF0080', '#00E5FF'][Math.floor(Math.random() * 8)];
        const shape = Math.random() > 0.5 ? '50%' : '2px';
        return (
          <div 
            key={i} 
            className="confetti-piece" 
            style={{ 
              left: `${Math.random() * 100}vw`, 
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: shape,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2.5 + Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.5,
              boxShadow: `0 0 10px ${color}44`
            }} 
          />
        );
      })}

      {/* Magic Burst Wave */}
      {burstActive && <div className="magic-burst" />}

      {/* Decorative floating elements */}
      <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-40 sm:h-40 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="w-full max-w-2xl xl:max-w-3xl relative px-2 sm:px-4">
        <div className={`bg-white border-[3px] sm:border-[4px] md:border-[6px] border-near-black rounded-2xl sm:rounded-[30px] md:rounded-[50px] p-4 sm:p-6 md:p-8 lg:p-10 shadow-brutalist relative overflow-hidden transition-all duration-700 max-h-[88vh] sm:max-h-[84vh] ${isDone ? 'sm:scale-[1.02] border-primary shadow-brutalist-purple ring-[4px] sm:ring-[8px] md:ring-[12px] ring-primary/5' : 'animate-in zoom-in-95'}`}>
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 mb-5 sm:mb-7 md:mb-9">
            <div className="space-y-3 sm:space-y-4 w-full sm:w-auto">
              <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 border-2 border-near-black rounded-full transition-colors ${isDone ? 'bg-primary text-white border-primary' : 'bg-primary/10 text-primary'}`}>
                {!isDone && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-primary rounded-full animate-ping"></span>}
                {isDone && <span className="material-icons text-xs sm:text-sm" aria-hidden="true">check_circle</span>}
                <span className="text-[10px] xs:text-xs sm:text-sm md:text-base font-black uppercase tracking-wider sm:tracking-widest">{getPhase()}</span>
              </div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter text-near-black leading-none break-words">
                {isDone ? "Pronta pro" : "Segura o"} <br/>
                <span className="text-primary italic">{isDone ? "SHOW, mona!" : "baile, mona."}</span>
              </h1>
            </div>
            <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 sm:border-[3px] md:border-4 border-near-black flex items-center justify-center transition-all duration-500 shadow-brutalist-sm shrink-0 ${isDone ? 'bg-primary text-white rotate-[360deg] sm:scale-105 shadow-[0_0_24px_#9767e4]' : 'bg-near-black text-white rotate-6 animate-bounce'}`}>
              <span className="material-icons text-2xl sm:text-3xl" aria-hidden="true">{isDone ? 'celebration' : 'psychology'}</span>
            </div>
          </div>

          {/* Progress Bar Section */}
          <div className="space-y-5 sm:space-y-6 mb-6 sm:mb-8">
            <div className="relative">
              <div className="w-full h-10 sm:h-12 md:h-14 bg-near-black/5 border-[3px] sm:border-[4px] border-near-black rounded-full overflow-hidden p-1 sm:p-1.5 shadow-inner relative">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ease-out shadow-brutalist-sm relative overflow-hidden ${isDone ? 'bg-primary' : 'pride-gradient'}`} 
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>

                {/* Fairy following progress */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700 ease-out z-20 ${isDone ? 'animate-[fairy-victory_1s_ease-in-out_infinite]' : ''}`}
                  style={{ 
                    left: `${progress}%`, 
                    marginLeft: progress > 5 ? '-20px' : '0px',
                    opacity: progress > 0 ? 1 : 0
                  }}
                >
                  <div className={`relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center ${!isDone ? 'animate-[fairy-float_2s_ease-in-out_infinite]' : ''}`}>
                    <div className="wing-loading wing-loading-left"></div>
                    <div className="fairy-body-loading"></div>
                    <div className="wing-loading wing-loading-right"></div>
                    
                    {/* Sparkles trail */}
                    {!isDone && [...Array(4)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-60"
                        style={{ 
                          left: `${Math.random() * 30 - 15}px`, 
                          top: `${Math.random() * 30 - 15}px`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: `${1 + Math.random()}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {isDone && (
                <div className="absolute right-0 sm:-right-3 md:-right-4 -top-5 sm:-top-6 md:-top-7 rotate-12 bg-primary border-2 sm:border-[3px] md:border-4 border-near-black px-2.5 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1.5 rounded-lg sm:rounded-xl shadow-brutalist-sm text-white animate-bounce">
                  <span className="text-[10px] xs:text-xs sm:text-sm font-black uppercase italic tracking-tighter">SUCCESS!</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 px-1 sm:px-3 md:px-4" aria-live="polite">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
                <span className={`material-icons text-primary text-base sm:text-lg md:text-xl shrink-0 ${!isDone && 'animate-spin'}`} aria-hidden="true">{isDone ? 'verified' : 'refresh'}</span>
                <span className="text-[10px] xs:text-xs sm:text-sm md:text-base font-black uppercase tracking-wide sm:tracking-widest text-near-black italic transition-all leading-tight sm:leading-relaxed text-center sm:text-left break-words">
                  {isDone ? "O plano mais babadeiro da sua vida está pronto!" : STATUS_MESSAGES[msgIndex]}
                </span>
              </div>
              <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black font-display text-primary tracking-tighter italic shrink-0">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Terminal Logs Simulation */}
          <div className="bg-near-black rounded-xl sm:rounded-2xl md:rounded-[30px] p-3 sm:p-4 md:p-5 border-2 sm:border-[3px] md:border-4 border-near-black shadow-brutalist-sm">
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4 border-b border-white/10 pb-2 sm:pb-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
              <span className="ml-1 sm:ml-2 text-[10px] xs:text-xs sm:text-sm md:text-base font-mono text-white/30 uppercase tracking-wider sm:tracking-widest break-all">monynha_kernel_logs.sh</span>
            </div>
            <div ref={logContainerRef} className="h-20 xs:h-24 sm:h-28 md:h-32 overflow-hidden font-mono text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-primary leading-snug sm:leading-relaxed">
              {isDone ? (
                <>
                  <p className="text-green-400 font-bold uppercase">&gt; [SUCCESS] Diagnosis generated successfully!</p>
                  <p className="text-green-400 font-bold uppercase">&gt; [SUCCESS] Lead stored in Database...</p>
                  <p className="text-green-400 font-bold uppercase">&gt; [SUCCESS] Strategies polished with Gemini AI...</p>
                  <p className="text-white">&gt; [SYSTEM] Redirecting to report module in 3, 2, 1...</p>
                </>
              ) : (
                logs.map((log, i) => (
                  <p key={i} className="animate-in slide-in-from-left-4 duration-300 opacity-80">{log}</p>
                ))
              )}
              {!isDone && <p className="animate-pulse">_</p>}
            </div>
          </div>

          {/* Footer of card */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-[3px] sm:border-t-4 border-near-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex -space-x-3 sm:-space-x-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-near-black bg-white flex items-center justify-center shadow-brutalist-sm overflow-hidden">
                   <img loading="lazy" decoding="async" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + progress}`} alt="" aria-hidden="true" />
                </div>
              ))}
            </div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-near-black/30 italic text-center sm:text-right">
              {isDone ? "Pronta pro próximo nível?" : "Processando com inteligência queer"}
            </span>
          </div>
        </div>

        {/* Floating background label */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-near-black/20 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] animate-pulse">
            {isDone ? "ABRA AS CORTINAS..." : "Sua revolução digital está sendo calculada..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
