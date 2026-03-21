import React, { useEffect, useState, useRef } from 'react';

const COLORS = ['#9767e4', '#FF0080', '#00E5FF', '#FFD600', '#76FF03', '#FFFFFF'];

const FairyCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const trailId = useRef(0);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother cursor tracking
      requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
      
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], label');
      setIsHovering(!!isInteractive);

      // Throttle trail creation for performance (max every 50ms)
      const now = Date.now();
      if (now - lastTrailTime.current > 60) {
        setTrail(prev => [
          ...prev.slice(-10),
          {
            id: trailId.current++,
            x: e.clientX,
            y: e.clientY,
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
          }
        ]);
        lastTrailTime.current = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <style>{`
        @keyframes cursorFlutter {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(75deg); }
        }
        @keyframes cursorColorCycle {
          0% { box-shadow: 0 0 15px 3px rgba(151, 103, 228, 0.7); background: #fff; }
          33% { box-shadow: 0 0 15px 3px rgba(0, 229, 255, 0.7); background: #E0FFFF; }
          66% { box-shadow: 0 0 15px 3px rgba(255, 0, 128, 0.7); background: #FFF0F5; }
          100% { box-shadow: 0 0 15px 3px rgba(151, 103, 228, 0.7); background: #fff; }
        }
        @keyframes cursorTrailFade {
          0% { transform: scale(1.4) rotate(0deg); opacity: 1; filter: blur(0px) brightness(2); }
          100% { transform: scale(0) rotate(180deg); opacity: 0; transform: translateY(20px) translateX(10px); filter: blur(4px); }
        }

        .cursor-fairy-container {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform, left, top;
          transform: translate(-50%, -50%);
        }

        .cursor-fairy-core {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: cursorColorCycle 3s infinite linear;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 2;
        }

        .cursor-fairy-container.hovering .cursor-fairy-core {
          transform: scale(2.2);
          filter: brightness(1.2);
        }

        .cursor-wing {
          position: absolute;
          width: 10px;
          height: 14px;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(1px);
          border: 0.5px solid rgba(255, 255, 255, 0.5);
          border-radius: 50% 50% 20% 80%;
          animation: cursorFlutter 0.12s infinite;
          top: -3px;
        }

        .cursor-wing-left { right: 50%; margin-right: 3px; transform-origin: center right; }
        .cursor-wing-right { left: 50%; margin-left: 3px; transform: scaleX(-1); transform-origin: center left; }
        
        .cursor-trail-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: cursorTrailFade 0.6s ease-out forwards;
          pointer-events: none;
        }
      `}</style>

      {/* Particle Trail */}
      {trail.map(t => (
        <div 
          key={t.id}
          className="cursor-trail-particle"
          style={{ 
            left: t.x, 
            top: t.y, 
            backgroundColor: t.color,
            boxShadow: `0 0 6px ${t.color}`
          }}
        />
      ))}

      {/* Fairy Cursor */}
      <div 
        className={`cursor-fairy-container ${isHovering ? 'hovering' : ''}`}
        style={{ 
          left: pos.x, 
          top: pos.y,
        }}
      >
        <div className="cursor-wing cursor-wing-left"></div>
        <div className="cursor-fairy-core"></div>
        <div className="cursor-wing cursor-wing-right"></div>
      </div>
    </div>
  );
};

export default FairyCursor;
