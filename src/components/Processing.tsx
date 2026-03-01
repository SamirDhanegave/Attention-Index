import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../utils/sound';

interface ProcessingProps {
  onComplete: () => void;
}

export default function Processing({ onComplete }: ProcessingProps) {
  useEffect(() => {
    soundManager.playScan();
    
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 seconds for dramatic effect

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 border-4 border-[#39FF14]/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        />
        
        {/* Scanning Ring */}
        <motion.div
          className="absolute inset-0 border-t-4 border-[#39FF14] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
        />

        {/* Inner Pulse */}
        <motion.div
          className="w-32 h-32 bg-[#39FF14]/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Text */}
        <div className="absolute font-mono text-[#39FF14] text-xl tracking-widest animate-pulse">
          ANALYZING
        </div>
      </div>

      <div className="mt-12 font-mono text-gray-500 text-sm uppercase tracking-[0.2em]">
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Mapping Neural Pathways...
        </motion.span>
      </div>
    </div>
  );
}
