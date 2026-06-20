import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import PricingCalculator from './PricingCalculator';
import Scheduler from './Scheduler';

const BookingFlow = () => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 text-center bg-[#1e1e1e]/40 border border-gray-800 rounded-2xl max-w-2xl mx-auto mt-16 backdrop-blur-md shadow-2xl">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
          <CheckCircle size={80} className="text-green-500 mb-6" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Booking Confirmed!</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8 font-light leading-relaxed">Thank you for choosing Trendhood. Your premium appointment is secured. We look forward to elevating your style.</p>
        <button onClick={() => { setIsSuccess(false); setStep(1); setSelectedServices([]); }} className="px-8 py-3 bg-[#D4AF37] text-[#121212] font-bold rounded-lg uppercase tracking-widest hover:bg-[#F3CE52] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]">Book Another</button>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-[500px]">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
            <PricingCalculator onNext={(services) => { setSelectedServices(services); setStep(2); }} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
            <Scheduler selectedServices={selectedServices} onBack={() => setStep(1)} onSuccess={() => setIsSuccess(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingFlow;
