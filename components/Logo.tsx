
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface LogoProps {
  className?: string;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ className = '', animate = false, size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-32 h-32'
  };

  // Explicitly typing pathVariants to fix "Type 'string' is not assignable to type 'Easing | Easing[]'" error for 'ease' property
  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3c83f6" />
          </linearGradient>
        </defs>
        
        {/* The abstract 'M' shape - fragmented and futuristic */}
        <motion.path
          d="M20 80V25L50 55L80 25V80"
          stroke="url(#logo-grad)"
          strokeWidth="10"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={animate ? pathVariants : {}}
          initial={animate ? "hidden" : "visible"}
          animate="visible"
        />
        
        {/* Decorative dot/pulse element */}
        <motion.circle
          cx="50"
          cy="75"
          r="5"
          fill="#8b5cf6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        />
      </svg>
      
      {/* Soft Glow Layer */}
      {animate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 bg-brand-violet rounded-full blur-2xl -z-10"
        />
      )}
    </div>
  );
};
