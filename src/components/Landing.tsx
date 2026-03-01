import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../utils/sound';
import { ArrowRight, Activity, Shield, Zap, Skull, Brain, Ghost } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    soundManager.playClick();
    onStart();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden">
      
      {/* Background Glitch Elements */}
      <div className="absolute top-10 sm:top-20 right-5 sm:right-20 text-[#333] opacity-20 text-6xl sm:text-9xl font-black select-none pointer-events-none rotate-12">
        COOKED
      </div>
      <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-20 text-[#333] opacity-20 text-6xl sm:text-9xl font-black select-none pointer-events-none -rotate-12">
        DOOM
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full relative z-10">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : -50 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="flex flex-col items-start text-left space-y-6 sm:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#CCFF00] border-2 border-black shadow-[4px_4px_0px_#000] text-[10px] sm:text-xs font-bold text-black uppercase tracking-wider transform -rotate-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Live Attention Analytics
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
            IS YOUR ATTENTION <br />
            <span className="text-[#CCFF00] drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]">COOKED?</span> 🧠🔥
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-[#A0A0A0] max-w-lg font-mono leading-tight">
            Measure your attention span. Find out if you're an <span className="text-white bg-black px-1">NPC</span> or the <span className="text-[#CCFF00] bg-black px-1">Main Character</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto mt-4">
            <button
              onClick={handleStart}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 sm:px-8 py-4 sm:py-5 bg-[#CCFF00] hover:bg-[#b3e600] text-black font-black text-lg sm:text-xl uppercase tracking-wide border-2 border-black shadow-[6px_6px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-3"
            >
              START SCAN [ENTER] <ArrowRight size={20} sm:size={24} strokeWidth={3} />
            </button>
          </div>

          <div className="pt-4 sm:pt-8 flex flex-wrap items-center gap-4 sm:gap-8 text-[#666] text-[10px] sm:text-xs font-mono uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Ghost size={14} sm:size={16} className="text-[#CCFF00]" />
              <span>100% Anon</span>
            </div>
            <div className="flex items-center gap-2">
              <Skull size={14} sm:size={16} className="text-[#CCFF00]" />
              <span>No Cap Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={14} sm:size={16} className="text-[#CCFF00]" />
              <span>Speedrun Mode</span>
            </div>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8, rotate: showContent ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full aspect-square max-w-md border-2 border-[#333] bg-[#111] p-8 shadow-[10px_10px_0px_#333]">
            {/* HUD Overlay */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#CCFF00]" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#CCFF00]" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#CCFF00]" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#CCFF00]" />
            
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[#CCFF00] font-mono text-xs animate-pulse">
              SYSTEM_SCANNING...
            </div>

            {/* Radar/Grid */}
            <div className="w-full h-full border border-[#333] rounded-full relative flex items-center justify-center overflow-hidden bg-[#000]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#CCFF00]/10 via-transparent to-transparent" />
              
              {/* Grid Lines */}
              <div className="absolute w-full h-[1px] bg-[#333]" />
              <div className="absolute h-full w-[1px] bg-[#333]" />
              <div className="absolute w-[70%] h-[70%] border border-[#333] rounded-full" />
              <div className="absolute w-[40%] h-[40%] border border-[#333] rounded-full" />

              {/* Scanning Line */}
              <motion.div 
                className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left bg-gradient-to-t from-transparent to-[#CCFF00]/20 border-l border-[#CCFF00]/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              {/* Blips */}
              <motion.div 
                className="absolute w-3 h-3 bg-[#FF00FF] rounded-full shadow-[0_0_10px_#FF00FF]"
                style={{ top: '30%', left: '60%' }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="absolute w-2 h-2 bg-[#CCFF00] rounded-full shadow-[0_0_10px_#CCFF00]"
                style={{ top: '70%', left: '40%' }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
            </div>
            
            {/* Floating Stats Cards */}
            <motion.div 
              className="absolute -top-6 -right-6 bg-[#000] border-2 border-[#FF00FF] p-3 shadow-[4px_4px_0px_#FF00FF]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="w-2 h-2 bg-[#FF00FF] animate-ping" />
                <span className="text-xs text-[#FF00FF] font-mono font-bold">ATTENTION_SPAN</span>
              </div>
              <div className="text-2xl font-black text-white">3s</div>
            </motion.div>

            <motion.div 
              className="absolute -bottom-6 -left-6 bg-[#000] border-2 border-[#CCFF00] p-3 shadow-[4px_4px_0px_#CCFF00]"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="w-2 h-2 bg-[#CCFF00] animate-ping" />
                <span className="text-xs text-[#CCFF00] font-mono font-bold">DOPAMINE</span>
              </div>
              <div className="text-2xl font-black text-white">CRITICAL</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
