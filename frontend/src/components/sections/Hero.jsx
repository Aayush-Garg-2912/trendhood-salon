import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <header id="home" className="relative py-32 rounded-3xl overflow-hidden shadow-2xl mb-16 border border-gray-800/50">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-[#121212]/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
      </div>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-white">
          Elevate Your <span className="font-bold text-[#D4AF37]">Style</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide mb-10 leading-relaxed">
          Experience premium grooming, exquisite styling, and luxurious care tailored exclusively for you at Trendhood Hair Salon.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#book" className="px-8 py-4 bg-[#D4AF37] hover:bg-[#F3CE52] text-[#121212] font-bold uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] w-full sm:w-auto">
            Book Now
          </a>
          <a href="#services" className="px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white font-bold uppercase tracking-widest text-sm rounded-xl transition-all w-full sm:w-auto">
            Explore Services
          </a>
        </div>
      </motion.div>
    </header>
  );
};

export default Hero;
