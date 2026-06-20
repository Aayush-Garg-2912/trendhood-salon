// import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Gallery from './components/sections/Gallery';
import Footer from './components/sections/Footer';
import AdminPanel from './pages/AdminPanel';
import BookingFlow from './components/sections/BookingFlow';
import Login from './pages/Login';
import Staff from './components/sections/Staff';
import Contact from './components/sections/Contact';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden font-inter">
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-6 py-10 space-y-24"
          >
            <Hero />
            
            <section id="book">
              <BookingFlow />
            </section>

            <section id="services">
              <Services />
            </section>

            <section id="staff">
              <Staff />
            </section>

            <Gallery />
            <Testimonials />
          </motion.div>
        } />
        
        <Route path="/login" element={
          <div className="max-w-7xl mx-auto px-6 py-10">
            <Login />
          </div>
        } />

        <Route path="/admin-dashboard" element={
          <ProtectedRoute>
            <div className="max-w-7xl mx-auto px-6 py-10">
              <AdminPanel />
            </div>
          </ProtectedRoute>
        } />
      </Routes>

      <Contact />
      <Footer />
    </div>
  );
}

export default App;
