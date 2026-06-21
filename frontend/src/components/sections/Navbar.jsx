import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="sticky top-0 z-50 px-4 md:px-6 pt-4 pb-2">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center py-4 px-6 md:px-8 max-w-7xl mx-auto bg-[#1e1e1e]/60 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl relative"
      >
        <Link to="/" className="text-xl md:text-2xl font-bold tracking-widest uppercase text-white z-50">
          Trendhood<span className="text-[#D4AF37]">.</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex text-xs uppercase tracking-widest font-bold items-center">
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

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-white z-50 focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-2 bg-[#1e1e1e] border border-white/5 rounded-2xl shadow-2xl overflow-hidden md:hidden flex flex-col"
            >
              <div className="flex flex-col py-4 px-6 text-sm uppercase tracking-widest font-bold gap-4">
                {isHome ? (
                  <>
                    <a href="#home" onClick={toggleMenu} className="text-gray-300 hover:text-[#D4AF37] transition-colors">Home</a>
                    <a href="#services" onClick={toggleMenu} className="text-gray-300 hover:text-[#D4AF37] transition-colors">Services</a>
                    <a href="#staff" onClick={toggleMenu} className="text-gray-300 hover:text-[#D4AF37] transition-colors">Team</a>
                    <a href="#book" onClick={toggleMenu} className="text-gray-300 hover:text-[#D4AF37] transition-colors">Book</a>
                  </>
                ) : (
                  <Link to="/" onClick={toggleMenu} className="text-gray-300 hover:text-[#D4AF37] transition-colors">Return Home</Link>
                )}
                <div className="border-t border-gray-800 my-2"></div>
                <Link to="/admin-dashboard" onClick={toggleMenu} className="text-[#D4AF37]">Admin Access</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
