import React from 'react';
import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-10 h-10 border-2 border-gray-700 border-t-[#D4AF37] rounded-full"
      />
    </div>
  );
};

export default Spinner;
