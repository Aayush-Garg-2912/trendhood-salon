import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="sticky top-0 z-50 px-6 pt-4 pb-2">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto bg-[#1e1e1e]/60 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl"
      >
        <Link to="/" className="text-2xl font-bold tracking-widest uppercase text-white">
          Trendhood<span className="text-[#D4AF37]">.</span>
        </Link>
        <div className="text-xs uppercase tracking-widest font-bold flex items-center">
          {isHome ? (
            <>
              <a href="#home" className="px-4 text-gray-300 hover:text-[#D4AF37] transition-colors">Home</a>
              <a href="#services" className="px-4 text-gray-300 hover:text-[#D4AF37] transition-colors">Services</a>
              <a href="#staff" className="px-4 text-gray-300 hover:text-[#D4AF37] transition-colors">Team</a>
              <a href="#book" className="px-4 text-gray-300 hover:text-[#D4AF37] transition-colors">Book</a>
            </>
          ) : (
            <Link to="/" className="px-4 text-gray-300 hover:text-[#D4AF37] transition-colors">Return Home</Link>
          )}
          <Link to="/admin-dashboard" className="px-4 ml-4 py-2 border border-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">Admin</Link>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
