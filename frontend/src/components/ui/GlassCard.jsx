import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = false, ...props }) => {
  return (
    <motion.div 
      whileHover={hover ? { y: -5 } : {}}
      className={`bg-[#1e1e1e]/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl overflow-hidden ${hover ? 'hover:border-[#D4AF37]/50 transition-colors' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
