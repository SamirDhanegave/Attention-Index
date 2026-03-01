import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Mail, Ghost } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function BrutalistModal({ isOpen, onClose, title, children, icon }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
            className="bg-[#000] border-2 border-[#CCFF00] w-full max-w-lg relative shadow-[8px_8px_0px_#CCFF00]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#CCFF00] p-4 flex justify-between items-center border-b-2 border-black">
              <div className="flex items-center gap-3 text-black font-black uppercase tracking-widest text-lg sm:text-xl">
                {icon}
                {title}
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center border-2 border-black bg-black text-[#CCFF00] hover:bg-white hover:text-black transition-colors"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {children}
            </div>

            {/* Footer Decoration */}
            <div className="h-2 bg-gradient-to-r from-[#CCFF00] via-[#39FF14] to-[#CCFF00]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface LegalModalsProps {
  activeModal: 'privacy' | 'contact' | null;
  onClose: () => void;
}

export default function LegalModals({ activeModal, onClose }: LegalModalsProps) {
  return (
    <>
      <BrutalistModal
        isOpen={activeModal === 'privacy'}
        onClose={onClose}
        title="PRIVACY_PROTOCOL"
        icon={<Shield size={24} strokeWidth={2.5} />}
      >
        <div className="space-y-6 font-mono text-sm sm:text-base text-[#A0A0A0]">
          <div className="p-4 border border-[#333] bg-[#111]">
            <h3 className="text-white font-bold uppercase mb-2 flex items-center gap-2">
              <Shield size={16} className="text-[#CCFF00]" />
              Data & Privacy
            </h3>
            <p className="mb-4">
              Attention Index does not collect, store, or process personal data.
            </p>
            <p className="mb-4">
              Your attention score is calculated locally within your browser and is not transmitted to our servers. We do not track IP addresses, location data, or personal identifiers.
            </p>
            <p>
              All results remain on your device and are cleared when you close the session.
            </p>
          </div>

          <p className="text-xs text-[#666] uppercase text-center mt-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </BrutalistModal>

      <BrutalistModal
        isOpen={activeModal === 'contact'}
        onClose={onClose}
        title="CONTACT_DEVS"
        icon={<Mail size={24} strokeWidth={2.5} />}
      >
        <div className="space-y-6 font-mono text-sm sm:text-base text-[#A0A0A0]">
          <p className="text-lg text-white font-bold">
            Notice an issue or have feedback on your results? We’d like to hear from you.
          </p>

          <div className="grid gap-4">
            <a href="mailto:smartguyagency@gmail.com" className="block p-4 border-2 border-[#333] hover:border-[#CCFF00] hover:bg-[#111] transition-all group">
              <div className="text-xs text-[#666] uppercase mb-1 group-hover:text-[#CCFF00]">Official Comms</div>
              <div className="text-white font-bold text-lg sm:text-xl truncate">smartguyagency@gmail.com</div>
            </a>
          </div>

          <div className="p-4 bg-[#111] border-l-4 border-[#CCFF00] mt-6">
            <p className="italic text-xs sm:text-sm">
              Built with curiosity and care.
              <br />
              <span className="text-[#CCFF00] font-bold not-italic mt-2 block">- The Dev</span>
            </p>
          </div>
        </div>
      </BrutalistModal>
    </>
  );
}
