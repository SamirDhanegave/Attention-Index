import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Clock, Shield, Zap, Brain, Activity, Calendar, Sword, Scroll } from 'lucide-react';

interface FixItProps {
  onBack: () => void;
  score: number;
}

export default function FixIt({ onBack, score }: FixItProps) {
  const isLowScore = score <= 40;

  const content = isLowScore ? {
    title: "MAINTENANCE MODE",
    subtitle: "KEEP THE STREAK",
    description: "Your stats are legendary. Don't let the brainrot creep back in. Execute these daily quests to maintain your buff.",
    cards: [
      {
        icon: <Brain size={24} />,
        color: "text-[#CCFF00]",
        bg: "bg-[#111]",
        title: "DEEP WORK GRIND",
        desc: "90-min uninterrupted focus blocks. No alt-tabbing. No notifications. Pure lock-in."
      },
      {
        icon: <Activity size={24} />,
        color: "text-[#39FF14]",
        bg: "bg-[#111]",
        title: "TOUCH GRASS",
        desc: "Physical reality check required. Leave the phone in another room for at least 1 hour daily."
      },
      {
        icon: <Calendar size={24} />,
        color: "text-[#FF00FF]",
        bg: "bg-[#111]",
        title: "WEEKLY SYNC",
        desc: "Sunday reset. Clear your cache (mind) and prep your loadout for the week."
      }
    ],
    planTitle: "DAILY QUESTS",
    plan: [
      { day: "Quest 1", task: "Unsubscribe from 5 newsletters", status: "completed" },
      { day: "Quest 2", task: "10 min meditation (AFK Mode)", status: "active" },
      { day: "Quest 3", task: "Read a book (Physical DLC)", status: "pending" },
      { day: "Quest 4", task: "IRL Socializing (No Phones)", status: "pending" },
      { day: "Quest 5", task: "Skill Grind (30 mins)", status: "pending" },
      { day: "Quest 6", task: "Review Stats", status: "pending" },
      { day: "Quest 7", task: "Plan Next Raid (Week)", status: "pending" },
    ],
    cta: "ACCEPT QUEST",
    users: "5,230 LEGENDS"
  } : {
    title: "SYSTEM RESTORE",
    subtitle: "HARD RESET REQUIRED",
    description: "Your dopamine receptors are fried. You need a full factory reset to clear the brainrot debuff.",
    cards: [
      {
        icon: <Clock size={24} />,
        color: "text-[#CCFF00]",
        bg: "bg-[#111]",
        title: "20-20-20 RULE",
        desc: "Every 20 mins, look 20ft away for 20s. Reset your vision rendering distance."
      },
      {
        icon: <Shield size={24} />,
        color: "text-[#39FF14]",
        bg: "bg-[#111]",
        title: "GREYSCALE MODE",
        desc: "Turn your phone screen B&W. Remove the RGB stimulus that keeps you hooked."
      },
      {
        icon: <Zap size={24} />,
        color: "text-red-500",
        bg: "bg-[#111]",
        title: "MORNING FAST",
        desc: "No screens for first 60 mins. Don't flood your RAM with dopamine on boot."
      }
    ],
    planTitle: "7-DAY DETOX RAID",
    plan: [
      { day: "Lvl 1", task: "Delete TikTok/Reels (The Boss)", status: "completed" },
      { day: "Lvl 2", task: "Mute All Notifications", status: "active" },
      { day: "Lvl 3", task: "Phone Ban: Bedroom Zone", status: "pending" },
      { day: "Lvl 4", task: "Read Paper Book (1 Hour)", status: "pending" },
      { day: "Lvl 5", task: "Walk Outside (No Headphones)", status: "pending" },
      { day: "Lvl 6", task: "Write 3 Long-term Goals", status: "pending" },
      { day: "Lvl 7", task: "Reintroduce Tech (Strict Rules)", status: "pending" },
    ],
    cta: "START RAID",
    users: "12,405 PLAYERS"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#666] hover:text-[#CCFF00] transition-colors mb-6 sm:mb-8 font-mono uppercase font-bold text-sm sm:text-base"
        >
          <ArrowLeft size={18} sm:size={20} />
          Return to Base
        </button>

        <div className="max-w-3xl mx-auto">
          {/* Left Column: The Protocol */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 uppercase tracking-tighter leading-[0.9]">
              {content.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-[#39FF14]">{content.subtitle}</span>
            </h1>
            <p className="text-[#A0A0A0] text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed font-mono">
              {content.description}
            </p>

            <div className="space-y-4 sm:space-y-6">
              {content.cards.map((card, index) => (
                <div key={index} className="bg-[#000] border-2 border-[#333] p-4 sm:p-6 shadow-[4px_4px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#333] transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#333] ${card.bg} flex items-center justify-center ${card.color} shrink-0`}>
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-black text-lg sm:text-xl mb-1 uppercase">{card.title}</h3>
                      <p className="text-[#666] text-xs sm:text-sm font-mono">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
