import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-3 font-bold uppercase tracking-widest text-sm rounded-xl transition-all outline-none flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-[#D4AF37] hover:bg-[#F3CE52] text-[#121212] shadow-[0_0_15px_rgba(212,175,55,0.2)] disabled:bg-gray-700 disabled:text-gray-400 disabled:shadow-none",
    outline: "bg-transparent border border-gray-600 hover:border-white text-white disabled:border-gray-800 disabled:text-gray-600",
    ghost: "bg-transparent hover:bg-white/5 text-gray-300 hover:text-white"
  };

  return (
    <motion.button 
      whileHover={props.disabled ? {} : { scale: 1.02 }}
      whileTap={props.disabled ? {} : { scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
