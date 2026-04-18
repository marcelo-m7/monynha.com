
import React, { useId } from 'react';
import { motion, Variants } from 'framer-motion';

interface LogoProps {
  className?: string;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ className = '', animate = false, size = 'md' }) => {
  const gradientId = useId();

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
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3c83f6" />
          </linearGradient>
        </defs>

        {/* O ring */}
        <motion.path
          d="M50 12C28.95 12 12 28.95 12 50C12 71.05 28.95 88 50 88C71.05 88 88 71.05 88 50C88 28.95 71.05 12 50 12Z"
          stroke={`url(#${gradientId})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? pathVariants : {}}
          initial={animate ? "hidden" : "visible"}
          animate="visible"
        />

        {/* 2 accent */}
        <motion.circle
          cx="68"
          cy="50"
          r="1"
          fill="transparent"
          variants={animate ? pathVariants : {}}
          initial={animate ? "hidden" : "visible"}
          animate="visible"
        />

        <motion.path
          d="M67 30H77C80.866 30 84 33.134 84 37C84 39.691 82.474 42.149 80.062 43.341L70.205 48.213C67.793 49.405 66.267 51.863 66.267 54.554C66.267 58.42 69.401 61.554 73.267 61.554H84"
          stroke={`url(#${gradientId})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? pathVariants : {}}
          initial={animate ? "hidden" : "visible"}
          animate="visible"
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
