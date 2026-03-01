import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Layout from './components/Layout';
import Landing from './components/Landing';
import Assessment from './components/Assessment';
import Processing from './components/Processing';
import Result from './components/Result';
import FixIt from './components/FixIt';

type Step = 'landing' | 'assessment' | 'processing' | 'result' | 'fixit';

export default function App() {
  const [step, setStep] = useState<Step>('landing');
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setStep('assessment');
  };

  const handleAssessmentComplete = (calculatedScore: number) => {
    setScore(calculatedScore);
    setStep('processing');
  };

  const handleProcessingComplete = () => {
    setStep('result');
  };

  const handleReset = () => {
    setStep('landing');
    setScore(0);
  };

  const handleFixIt = () => {
    setStep('fixit');
  };

  const handleBackToResult = () => {
    setStep('result');
  };

  return (
    <Layout onLogoClick={handleReset}>
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen"
          >
            <Landing onStart={handleStart} />
          </motion.div>
        )}

        {step === 'assessment' && (
          <motion.div
            key="assessment"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen"
          >
            <Assessment onComplete={handleAssessmentComplete} />
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen"
          >
            <Processing onComplete={handleProcessingComplete} />
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <Result score={score} onReset={handleReset} onFixIt={handleFixIt} />
          </motion.div>
        )}

        {step === 'fixit' && (
          <motion.div
            key="fixit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen"
          >
            <FixIt onBack={handleBackToResult} score={score} />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
