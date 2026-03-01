import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Brain, Zap } from 'lucide-react';
import { soundManager } from '../utils/sound';
import LegalModals from './LegalModals';

interface LayoutProps {
  children: React.ReactNode;
  onLogoClick?: () => void;
}

export default function Layout({ children, onLogoClick }: LayoutProps) {
  const [isMuted, setIsMuted] = React.useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'contact' | null>(null);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#FFFFFF] overflow-hidden font-display selection:bg-[#CCFF00] selection:text-black">
      {/* Scanline Effect */}
      <div className="scanline pointer-events-none fixed inset-0 z-50 opacity-10" />

      {/* Marquee */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#CCFF00] text-black overflow-hidden py-1 border-b-2 border-black font-mono text-xs font-bold uppercase tracking-widest">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="whitespace-nowrap flex gap-8"
        >
          {Array(10).fill("ATTENTION INDEX // MEASURE YOUR COOKED LEVELS // DOOMSCROLLING DETECTOR //").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-8 left-0 w-full z-40 px-4 sm:px-6 py-4 flex justify-between items-center pointer-events-none">
        <div 
          onClick={onLogoClick}
          className="pointer-events-auto bg-black/80 backdrop-blur-md border-2 border-[#333] px-3 sm:px-4 py-2 rounded-none flex items-center gap-3 shadow-[4px_4px_0px_#CCFF00] cursor-pointer hover:bg-[#111] transition-colors"
        >
          <div className="w-8 h-8 bg-[#CCFF00] flex items-center justify-center text-black border border-black">
            <Brain size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tighter uppercase font-display">Attention <span className="text-[#CCFF00]">Index</span></span>
        </div>
        
        <div className="pointer-events-auto flex items-center gap-4">
          <button 
            onClick={toggleSound}
            className="bg-black/80 backdrop-blur-md border-2 border-[#333] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-all p-2 rounded-none shadow-[4px_4px_0px_#333] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#333]"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-30 w-full min-h-screen flex flex-col pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t-2 border-[#333] mt-auto bg-[#050505] relative z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#666] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[#CCFF00]" />
            <span>System Status: <span className="text-[#CCFF00]">ONLINE</span></span>
          </div>
          <div className="text-center text-[#666]">
            Attention Index is a product by <span className="text-[#CCFF00]">Smart Guy Agency</span>
          </div>
          <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
            <button 
              onClick={() => setActiveModal('privacy')}
              className="hover:text-[#CCFF00] transition-colors hover:underline decoration-wavy bg-transparent border-none cursor-pointer p-0 font-mono text-xs uppercase tracking-wider text-[#666]"
            >
              Privacy_Protocol
            </button>
            <button 
              onClick={() => setActiveModal('contact')}
              className="hover:text-[#CCFF00] transition-colors hover:underline decoration-wavy bg-transparent border-none cursor-pointer p-0 font-mono text-xs uppercase tracking-wider text-[#666]"
            >
              Contact_Devs
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LegalModals 
        activeModal={activeModal} 
        onClose={() => setActiveModal(null)} 
      />
    </div>
  );
}
