import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  delay: number;
  size: number;
  opacity: number;
}

interface GlitterRevealProps {
  prefersReducedMotion: boolean;
}

const generateParticles = (): Particle[] => {
  const particles: Particle[] = [];
  const particleCount = 12;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      id: i,
      delay: (i / particleCount) * 0.8,
      size: 4 + Math.random() * 6,
      opacity: 0.6 + Math.random() * 0.4,
    });
  }
  
  return particles;
};

export const GlitterReveal: React.FC<GlitterRevealProps> = ({ prefersReducedMotion }) => {
  const particles = useMemo(() => generateParticles(), []);
  
  if (prefersReducedMotion) {
    return (
      <motion.div className="flex flex-col items-center gap-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-display font-black text-5xl uppercase tracking-[0.08em] leading-tight"
        >
          Open 2 Technology
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
          className="h-1 bg-gradient-to-r from-brand-violet to-brand-blue w-64"
        />
      </motion.div>
    );
  }

  return (
    <motion.div className="flex flex-col items-center gap-8 relative">
      {/* SVG Particle Container */}
      <svg
        className="absolute inset-0 w-full pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))' }}
        viewBox="0 0 600 120"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0c3fc" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#3c83f6" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Animated Particle Trail */}
        {particles.map((particle) => (
          <motion.circle
            key={particle.id}
            cx="0"
            cy="60"
            r={particle.size / 2}
            fill="url(#sparkleGradient)"
            filter="url(#glow)"
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: 600,
              opacity: [0, particle.opacity, particle.opacity, 0],
            }}
            transition={{
              duration: 1.8,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Text Container with Mask Effect */}
      <div className="relative">
        {/* Hidden reference text for width */}
        <p className="font-display font-black text-5xl uppercase tracking-[0.08em] leading-tight invisible">
          Open 2 Technology
        </p>

        {/* Animated Masked Text */}
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          transition={{
            duration: 1.8,
            ease: 'easeInOut',
            delay: 0.1,
          }}
        >
          <p className="font-display font-black text-5xl uppercase tracking-[0.08em] leading-tight bg-gradient-to-r from-brand-violet via-white to-brand-blue bg-clip-text text-transparent">
            Open 2 Technology
          </p>
        </motion.div>

        {/* Initial Hidden Text */}
        <motion.p
          className="font-display font-black text-5xl uppercase tracking-[0.08em] leading-tight text-brand-black/20"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, delay: 0.1 }}
        >
          Open 2 Technology
        </motion.p>
      </div>

      {/* Glowing Accent Line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 1.0,
          ease: 'easeOut',
        }}
        className="h-1 w-64 bg-gradient-to-r from-brand-violet via-brand-blue to-blue-400"
        style={{
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(60, 131, 246, 0.4)',
        }}
      />

      {/* Shimmer Overlay Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 1.8, delay: 0.1 }}
        style={{
          background: 'radial-gradient(circle 200px at center, rgba(255,255,255,0.3), transparent)',
        }}
      />
    </motion.div>
  );
};
