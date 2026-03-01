import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';
import { RefreshCw, Share2, Zap } from 'lucide-react';

interface ResultProps {
  score: number;
  onReset: () => void;
  onFixIt?: () => void;
}

const getIdentity = (score: number) => {
  if (score <= 20) return { title: "ZEN MASTER", desc: "Your brain is a fortress. You probably touch grass daily.", color: "text-[#CCFF00]", level: "GOD TIER", emoji: "🧘‍♂️" };
  if (score <= 40) return { title: "MAIN CHARACTER", desc: "You have control. The algorithm works for you, not against you.", color: "text-[#39FF14]", level: "LEGENDARY", emoji: "🧠" };
  if (score <= 60) return { title: "NPC ENERGY", desc: "You're slipping. The doomscroll is starting to win.", color: "text-yellow-400", level: "RARE", emoji: "😐" };
  if (score <= 80) return { title: "COOKED", desc: "Bro, put the phone down. Your dopamine receptors are frying.", color: "text-orange-500", level: "COMMON", emoji: "🍳" };
  return { title: "TERMINAL BRAINROT", desc: "It's over for you. You need a factory reset immediately.", color: "text-red-600", level: "TRASH", emoji: "💀" };
};

export default function Result({ score, onReset, onFixIt }: ResultProps) {
  const [showScore, setShowScore] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [showIdentity, setShowIdentity] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const identity = getIdentity(score);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowScore(true);
    }, 500);
    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (showScore) {
      let start = 0;
      const duration = 1500;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = score / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= score) {
          setDisplayScore(score);
          clearInterval(timer);
          setTimeout(() => setShowIdentity(true), 400);
        } else {
          setDisplayScore(Math.floor(start));
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [showScore, score]);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, { cacheBust: true, backgroundColor: '#000000' });
        const link = document.createElement('a');
        link.download = 'brainrot-stats.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to download image', err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      
      <div className="w-full">
        {/* Result Card */}
        <div className="w-full">
          <div 
            ref={cardRef}
            className="bg-[#000] border-2 border-[#333] p-6 sm:p-8 shadow-[8px_8px_0px_#333] relative overflow-hidden"
          >
            {/* Decorative Corner */}
            <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-t-4 border-l-4 border-[#CCFF00]" />
            <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-b-4 border-r-4 border-[#CCFF00]" />

            {/* Header */}
            <div className="flex justify-between items-start mb-8 font-mono uppercase">
              <div className="text-[10px] sm:text-xs font-bold text-[#666] flex items-center gap-2">
                <Zap size={12} className="text-[#CCFF00]" />
                MISSION DEBRIEF
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-[#CCFF00] bg-[#111] px-2 py-1 border border-[#333]">
                {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Score Display */}
            <div className="text-center mb-12 relative">
              <div className="text-xs sm:text-sm font-bold text-[#666] mb-2 uppercase tracking-widest font-mono">COOKED PERCENTAGE</div>
              <div className="text-7xl sm:text-9xl font-black text-white tracking-tighter mb-2 relative inline-block">
                {displayScore}%
                <span className="absolute -top-2 -right-6 sm:-top-4 sm:-right-8 text-lg sm:text-2xl text-[#CCFF00] font-mono animate-pulse">XP</span>
              </div>
              
              {/* Status Bar */}
              <div className="w-full h-4 bg-[#111] border-2 border-[#333] p-[2px] mb-2">
                <div className="flex h-full w-full">
                  <div className="h-full bg-[#4F8CFF] w-1/4 border-r border-black" />
                  <div className="h-full bg-[#39FF14] w-1/4 border-r border-black" />
                  <div className="h-full bg-yellow-400 w-1/4 border-r border-black" />
                  <div className="h-full bg-red-600 w-1/4" />
                </div>
                {/* Indicator */}
                <motion.div 
                  className="w-1 h-6 bg-white absolute top-[-4px] border border-black"
                  initial={{ left: "0%" }}
                  animate={{ left: `${score}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              
              <div className="flex justify-between text-[8px] sm:text-[10px] text-[#666] uppercase font-bold font-mono tracking-widest">
                <span>ZEN</span>
                <span>MID</span>
                <span>COOKED</span>
                <span>DEAD</span>
              </div>
            </div>

            {/* Insight */}
            <AnimatePresence>
              {showIdentity && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="bg-[#111] p-4 sm:p-6 border-2 border-[#333] relative"
                >
                  <div className="absolute -top-3 left-4 bg-[#CCFF00] text-black px-2 py-0.5 text-[10px] sm:text-xs font-black uppercase tracking-widest border border-black">
                    RANK: {identity.level}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                    <span className="text-6xl sm:text-7xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{identity.emoji}</span>
                    <div>
                      <h3 className={`font-black text-2xl sm:text-3xl ${identity.color} mb-2 uppercase tracking-tight`}>{identity.title}</h3>
                      <p className="text-[#A0A0A0] text-xs sm:text-sm font-mono leading-relaxed">
                        {identity.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          {showIdentity && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4 mt-6"
            >
              {onFixIt && (
                <button 
                  onClick={onFixIt}
                  className="w-full py-4 sm:py-5 bg-[#CCFF00] hover:bg-[#b3e600] text-black font-black text-lg sm:text-xl uppercase tracking-widest border-2 border-black shadow-[6px_6px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-3 group"
                >
                  <span className="text-2xl sm:text-3xl group-hover:rotate-12 transition-transform">
                    {score <= 40 ? "🛡️" : "🛠️"}
                  </span>
                  {score <= 40 ? "MAINTAIN STREAK" : "REPAIR SYSTEM"}
                </button>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleDownload}
                  className="flex-1 py-3 sm:py-4 bg-[#111] border-2 border-[#333] hover:border-[#CCFF00] hover:text-[#CCFF00] text-white font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-[4px_4px_0px_#333] hover:shadow-[4px_4px_0px_#CCFF00]"
                >
                  <Share2 size={18} />
                  SHARE STATS
                </button>
                <button 
                  onClick={onReset}
                  className="flex-1 py-3 sm:py-4 bg-[#111] border-2 border-[#333] hover:border-white hover:text-white text-[#666] font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-[4px_4px_0px_#333] hover:shadow-[4px_4px_0px_#fff]"
                >
                  <RefreshCw size={18} />
                  RESPAWN
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
