import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../utils/sound';
import { Check, Zap } from 'lucide-react';

interface AssessmentProps {
  onComplete: (score: number) => void;
}

const questions = [
  {
    id: 1,
    text: "Daily Screen Time? 📱",
    type: "slider",
    min: 0,
    max: 12,
    step: 1,
    suffix: "hrs",
  },
  {
    id: 2,
    text: "Phone first thing in the AM? ☀️",
    type: "binary",
    options: ["Nah", "Guilty"],
  },
  {
    id: 3,
    text: "Can you watch a 10m video without 2x speed? ⏩",
    type: "binary",
    options: ["Easy", "Impossible"],
  },
  {
    id: 4,
    text: "Anxiety when phone is dead? 🪫",
    type: "scale",
    min: 1,
    max: 5,
    labels: ["Chill", "Panic"],
  },
  {
    id: 5,
    text: "Doomscrolling frequency? 🧟",
    type: "choice",
    options: ["Never", "Sometimes", "Locked In"],
  },
];

export default function Assessment({ onComplete }: AssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sliderValue, setSliderValue] = useState(6);

  const handleAnswer = (value: any) => {
    if (isTransitioning) return;
    
    soundManager.playClick();
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
        setSliderValue(6);
      } else {
        calculateScore(newAnswers);
      }
    }, 400);
  };

  const calculateScore = (finalAnswers: Record<number, any>) => {
    let score = 0;
    const hours = finalAnswers[1];
    if (hours > 8) score += 30;
    else if (hours > 6) score += 20;
    else if (hours > 4) score += 10;
    
    if (finalAnswers[2] === "Guilty") score += 15;
    if (finalAnswers[3] === "Impossible") score += 15;
    
    score += (finalAnswers[4] || 1) * 4;
    
    if (finalAnswers[5] === "Locked In") score += 20;
    else if (finalAnswers[5] === "Sometimes") score += 10;
    
    score += Math.floor(Math.random() * 7) - 3;
    score = Math.max(0, Math.min(100, score));
    onComplete(score);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const q = questions[currentQuestion];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full max-w-2xl mx-auto px-4 sm:px-6">
      {/* Progress Header */}
      <div className="w-full mb-6 sm:mb-8">
        <div className="flex justify-between items-end mb-2 font-mono uppercase">
          <span className="text-[10px] sm:text-xs font-bold text-[#666] flex items-center gap-2">
            <Zap size={12} className="text-[#CCFF00]" />
            Syncing Neural Link...
          </span>
          <span className="text-lg sm:text-xl font-black text-[#CCFF00] tracking-widest">
            LVL {currentQuestion + 1}<span className="text-[#333]">/</span>{questions.length}
          </span>
        </div>
        <div className="h-3 sm:h-4 bg-[#111] border-2 border-[#333] p-[2px]">
          <motion.div 
            className="h-full bg-[#CCFF00] shadow-[0_0_10px_#CCFF00]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "circOut" }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full bg-[#000] border-2 border-[#333] p-6 sm:p-8 shadow-[6px_6px_0px_#333] sm:shadow-[8px_8px_0px_#333] relative overflow-hidden">
        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-6 sm:w-8 h-6 sm:h-8 bg-[#CCFF00] clip-path-polygon-[100%_0,0_0,100%_100%]" />
        
        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className="w-full"
            >
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-none tracking-tight">
                  {q.text}
                </h2>
              </div>

              <div className="w-full">
                {q.type === "slider" && (
                  <div className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex items-end gap-2 font-mono">
                      <span className="text-5xl sm:text-6xl font-black text-[#CCFF00]">{sliderValue}</span>
                      <span className="text-lg sm:text-xl text-[#666] mb-2 sm:mb-3">{q.suffix}</span>
                    </div>
                    <input
                      type="range"
                      min={q.min}
                      max={q.max}
                      step={q.step}
                      value={sliderValue}
                      onChange={(e) => setSliderValue(parseInt(e.target.value))}
                      className="w-full h-4 bg-[#111] border-2 border-[#333] appearance-none cursor-pointer accent-[#CCFF00] hover:accent-[#b3e600]"
                    />
                    <button
                      onClick={() => handleAnswer(sliderValue)}
                      className="w-full py-3 sm:py-4 bg-[#CCFF00] hover:bg-[#b3e600] text-black font-black text-sm sm:text-base uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                    >
                      Confirm Selection [ENTER]
                    </button>
                  </div>
                )}

                {q.type === "binary" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {q.options?.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="py-4 sm:py-6 bg-[#111] border-2 border-[#333] hover:border-[#CCFF00] hover:text-[#CCFF00] text-white font-bold text-lg sm:text-xl uppercase tracking-wide transition-all shadow-[4px_4px_0px_#333] hover:shadow-[4px_4px_0px_#CCFF00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#CCFF00]"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === "choice" && (
                  <div className="flex flex-col gap-3">
                    {q.options?.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="w-full py-3 sm:py-4 px-4 sm:px-6 text-left bg-[#111] border-2 border-[#333] hover:border-[#CCFF00] hover:text-[#CCFF00] text-white font-bold text-base sm:text-lg uppercase tracking-wide transition-all flex justify-between items-center group shadow-[4px_4px_0px_#333] hover:shadow-[4px_4px_0px_#CCFF00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#CCFF00]"
                      >
                        {opt}
                        <Check size={18} sm:size={20} className="opacity-0 group-hover:opacity-100 text-[#CCFF00] transition-opacity" strokeWidth={3} />
                      </button>
                    ))}
                  </div>
                )}

                {q.type === "scale" && (
                  <div>
                    <div className="flex justify-between mb-4 text-[10px] sm:text-xs font-bold text-[#666] uppercase tracking-widest font-mono">
                      <span>{q.labels?.[0]}</span>
                      <span>{q.labels?.[1]}</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => handleAnswer(num)}
                          className="aspect-square bg-[#111] border-2 border-[#333] hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black text-white font-black text-xl sm:text-2xl transition-all shadow-[4px_4px_0px_#333] hover:shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000]"
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
