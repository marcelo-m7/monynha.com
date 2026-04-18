import { motion } from 'framer-motion';

interface SparkParticle {
  id: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  blur: number;
}

interface GlitterRevealProps {
  prefersReducedMotion: boolean;
}

const SPARK_PARTICLES: SparkParticle[] = [
  { id: 1, size: 3, delay: 0.04, duration: 1.45, opacity: 0.9, blur: 0 },
  { id: 2, size: 4, delay: 0.1, duration: 1.48, opacity: 0.85, blur: 0.4 },
  { id: 3, size: 5, delay: 0.16, duration: 1.52, opacity: 0.8, blur: 0.8 },
  { id: 4, size: 3, delay: 0.2, duration: 1.6, opacity: 0.75, blur: 0.2 },
  { id: 5, size: 6, delay: 0.26, duration: 1.68, opacity: 0.7, blur: 1 },
  { id: 6, size: 4, delay: 0.34, duration: 1.72, opacity: 0.78, blur: 0.5 },
  { id: 7, size: 3, delay: 0.4, duration: 1.78, opacity: 0.72, blur: 0.4 },
  { id: 8, size: 5, delay: 0.5, duration: 1.84, opacity: 0.68, blur: 1.1 },
  { id: 9, size: 4, delay: 0.58, duration: 1.9, opacity: 0.65, blur: 0.7 },
  { id: 10, size: 3, delay: 0.66, duration: 1.96, opacity: 0.62, blur: 0.4 },
  { id: 11, size: 5, delay: 0.72, duration: 2.0, opacity: 0.58, blur: 1.2 },
  { id: 12, size: 4, delay: 0.8, duration: 2.05, opacity: 0.56, blur: 0.8 },
];

export const GlitterReveal = ({ prefersReducedMotion }: GlitterRevealProps) => {
  if (prefersReducedMotion) {
    return (
      <motion.div className="flex flex-col items-center gap-9">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="font-display font-black text-4xl md:text-6xl uppercase tracking-[0.12em] leading-tight bg-gradient-to-r from-brand-violet via-white to-brand-blue bg-clip-text text-transparent"
        >
          Open 2 Technology
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="h-1 bg-gradient-to-r from-brand-violet to-brand-blue w-72"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative flex flex-col items-center gap-9 w-[min(92vw,860px)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative flex items-center justify-center w-full">
        <motion.svg
          className="absolute top-1/2 left-1/2 w-[min(92vw,840px)] h-36 -translate-x-1/2 -translate-y-[68%] pointer-events-none"
          viewBox="0 0 860 170"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sparkTrailGradient" x1="0" y1="0" x2="860" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="1" stopColor="#3c83f6" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <motion.path
            d="M 58 118 C 212 18, 594 14, 806 94"
            stroke="url(#sparkTrailGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0.55] }}
            transition={{ duration: 1.7, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 9px rgba(139, 92, 246, 0.75))' }}
          />
        </motion.svg>

        {SPARK_PARTICLES.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: particle.size,
              height: particle.size,
              background: particle.id % 2 === 0 ? '#ffffff' : '#c4b5fd',
              filter: `blur(${particle.blur}px)`,
              boxShadow: particle.id % 3 === 0
                ? '0 0 14px rgba(147, 197, 253, 0.95), 0 0 24px rgba(139, 92, 246, 0.75)'
                : '0 0 14px rgba(255, 255, 255, 0.85), 0 0 24px rgba(139, 92, 246, 0.55)',
            }}
            initial={{ x: '-46%', y: 14, opacity: 0 }}
            animate={{
              x: ['-46%', '-25%', '0%', '26%', '48%'],
              y: [14, -16, -26, -12, 8],
              opacity: [0, particle.opacity, particle.opacity * 0.8, 0],
              scale: [0.85, 1.2, 1, 0.78],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: [0.2, 0.75, 0.2, 1],
            }}
          />
        ))}

        <div className="relative">
          <p className="font-display font-black text-4xl md:text-6xl uppercase tracking-[0.12em] leading-tight invisible select-none">
            Open 2 Technology
          </p>

          <motion.p
            className="absolute inset-0 font-display font-black text-4xl md:text-6xl uppercase tracking-[0.12em] leading-tight bg-gradient-to-r from-[#bea4ff] via-white to-[#8cc8ff] bg-clip-text text-transparent"
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.35 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 1.55, delay: 0.15, ease: 'easeOut' }}
          >
            Open 2 Technology
          </motion.p>

          <motion.p
            className="font-display font-black text-4xl md:text-6xl uppercase tracking-[0.12em] leading-tight text-white/8"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.25, delay: 0.1, ease: 'easeInOut' }}
          >
            Open 2 Technology
          </motion.p>

          <motion.div
            className="absolute inset-y-0 -left-[22%] w-[44%] pointer-events-none"
            style={{
              background: 'linear-gradient(100deg, rgba(255,255,255,0) 15%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 85%)',
              filter: 'blur(1.6px)',
            }}
            initial={{ x: '0%', opacity: 0 }}
            animate={{ x: '315%', opacity: [0, 0.72, 0] }}
            transition={{ duration: 1.05, delay: 0.55, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <motion.div
        className="h-1 w-72 bg-gradient-to-r from-brand-violet to-brand-blue"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.85, delay: 1.05, ease: 'easeOut' }}
        style={{
          transformOrigin: 'left center',
          boxShadow: '0 0 16px rgba(139, 92, 246, 0.75), 0 0 28px rgba(60, 131, 246, 0.5)',
        }}
      />
    </motion.div>
  );
};
