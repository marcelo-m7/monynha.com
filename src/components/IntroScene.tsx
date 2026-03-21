
import React, { useEffect, useState, useRef } from 'react';

interface IntroSceneProps {
  onComplete: () => void;
}

const COLORS = ['#9767e4', '#FF0080', '#00E5FF', '#FFD600', '#76FF03', '#FFFFFF'];
const SLOGAN_PRIMARY = "Monynha Softwares";
const SLOGAN_SECONDARY = "sua presença digital";

const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
  const [revealedPrimary, setRevealedPrimary] = useState(0);
  const [revealedSecondary, setRevealedSecondary] = useState(0);
  const [fairyPos, setFairyPos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  
  const particleId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const fairyRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLHeadingElement>(null);
  const secondaryRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Total duration: 3s. Exit starts slightly before for smoothness.
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2400);

    const finalTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    const interval = setInterval(() => {
      if (fairyRef.current && containerRef.current) {
        const fairyRect = fairyRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        const currentX = fairyRect.left - containerRect.left + fairyRect.width / 2;
        const currentY = fairyRect.top - containerRect.top + fairyRect.height / 2;
        
        setFairyPos({ x: currentX, y: currentY });

        if (Math.random() > 0.4) {
          const newParticle = {
            id: particleId.current++,
            x: currentX,
            y: currentY,
            size: Math.random() * 3 + 1,
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
          };
          setParticles(prev => [...prev.slice(-25), newParticle]);
        }

        if (primaryRef.current) {
          const pRect = primaryRef.current.getBoundingClientRect();
          const pLocalX = fairyRect.left - pRect.left + fairyRect.width / 2;
          if (pLocalX > 0) {
            const progress = Math.min(1, pLocalX / pRect.width);
            const count = Math.ceil(progress * SLOGAN_PRIMARY.length);
            setRevealedPrimary(prev => Math.max(prev, count));
          }
        }

        if (secondaryRef.current) {
          const sRect = secondaryRef.current.getBoundingClientRect();
          const sLocalX = fairyRect.left - sRect.left + fairyRect.width / 2;
          if (sLocalX > 0) {
            const progress = Math.min(1, sLocalX / sRect.width);
            const count = Math.ceil(progress * SLOGAN_SECONDARY.length);
            setRevealedSecondary(prev => Math.max(prev, count));
          }
        }
      }
    }, 16);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finalTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 bg-[#020205] flex items-center justify-center z-[110] overflow-hidden transition-all duration-[600ms] cubic-bezier(0.4, 0, 0.2, 1) ${isExiting ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100'}`}
    >
      <style>{`
        @keyframes flutter {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(70deg); }
        }
        @keyframes fairyPassBy {
          0% { left: -10%; top: 48%; transform: scale(0.6); }
          20% { left: 15%; top: 45%; transform: scale(0.9); }
          40% { left: 45%; top: 52%; transform: scale(1.1); }
          60% { left: 70%; top: 48%; transform: scale(1.1); }
          80% { left: 95%; top: 55%; transform: scale(0.9); }
          100% { left: 130%; top: 50%; transform: scale(0.6); }
        }
        @keyframes letterAppear {
          0% { 
            opacity: 0; 
            filter: blur(8px); 
            text-shadow: 0 0 20px #9767e4, 0 0 40px #9767e4; 
            transform: scale(1.4); 
          }
          100% { 
            opacity: 1; 
            filter: blur(0px); 
            text-shadow: 0 0 0px transparent;
            transform: scale(1);
          }
        }
        @keyframes particleFadeOut {
          0% { transform: scale(1.2); opacity: 1; filter: brightness(2); }
          100% { transform: scale(0); opacity: 0; transform: translateY(12px); }
        }

        .fairy-path-unit {
          position: absolute;
          width: 50px;
          height: 50px;
          z-index: 50;
          animation: fairyPassBy 2.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          pointer-events: none;
        }

        .fairy-body {
          width: 14px;
          height: 14px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 20px 8px #9767e4, 0 0 40px 15px rgba(151, 103, 228, 0.5), 0 0 60px 20px rgba(0, 229, 255, 0.3);
          animation: fairyPulse 1.5s ease-in-out infinite;
        }

        @keyframes fairyPulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.2); filter: brightness(1.5); }
        }

        .wing-unit {
          position: absolute;
          top: -10px;
          width: 22px;
          height: 32px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(1px);
          border: 0.5px solid rgba(255, 255, 255, 0.4);
          border-radius: 50% 50% 30% 70%;
          animation: flutter 0.08s infinite;
        }
        .wing-u-left { right: 50%; margin-right: 6px; transform-origin: center right; }
        .wing-u-right { left: 50%; margin-left: 6px; transform: scaleX(-1); transform-origin: center left; }

        .letter-revealed {
          display: inline-block;
          opacity: 0;
          white-space: pre;
          animation: letterAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .ambient-fairy-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(151, 103, 228, 0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 5;
          transform: translate(-50%, -50%);
          transition: left 0.08s ease-out, top 0.08s ease-out;
        }
      `}</style>

      <div 
        className="ambient-fairy-glow" 
        style={{ left: fairyPos.x, top: fairyPos.y }}
      />

      {particles.map(p => (
        <div 
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{ 
            left: p.x, 
            top: p.y, 
            width: p.size, 
            height: p.size, 
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animation: 'particleFadeOut 0.4s ease-out forwards'
          }}
        />
      ))}

      <div ref={fairyRef} className="fairy-path-unit flex items-center justify-center">
        <div className="wing-unit wing-u-left"></div>
        <div className="fairy-body"></div>
        <div className="wing-unit wing-u-right"></div>
      </div>

      <div className="flex flex-col items-center gap-2 relative z-10 pointer-events-none select-none text-center">
        <h1 
          ref={primaryRef}
          className="font-display font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tighter leading-tight"
        >
          {SLOGAN_PRIMARY.split('').map((char, i) => (
            <span 
              key={i} 
              className={i < revealedPrimary ? 'letter-revealed' : 'opacity-0'}
            >
              {char}
            </span>
          ))}
        </h1>
        <p 
          ref={secondaryRef}
          className="font-cursive text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/60 tracking-normal"
          style={{ marginTop: '-0.2em' }}
        >
          {SLOGAN_SECONDARY.split('').map((char, i) => (
            <span 
              key={i} 
              className={i < revealedSecondary ? 'letter-revealed' : 'opacity-0'}
              style={{ animationDelay: '0.05s' }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default IntroScene;
