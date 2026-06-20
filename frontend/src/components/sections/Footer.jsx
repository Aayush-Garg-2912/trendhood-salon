import React, { useState } from 'react';
import api from '../../utils/api';
import { MapPin, Phone, Clock } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', error: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', error: '' });
    try {
      await api.post('/api/contact/send', { email, type: 'newsletter' });
      setStatus({ loading: false, message: 'Subscribed successfully!', error: '' });
      setEmail('');
    } catch (err) {
      setStatus({ loading: false, message: '', error: 'Subscription failed.' });
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 pt-20 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="text-2xl font-bold tracking-widest uppercase mb-6">
            Trendhood<span className="text-[#D4AF37]">.</span>
          </div>
          <p className="text-gray-400 font-light leading-relaxed mb-6">
            Setting the standard for luxury grooming and styling. Experience excellence in every detail.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center text-gray-400 hover:text-[#D4AF37] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center text-gray-400 hover:text-[#D4AF37] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center text-gray-400 hover:text-[#D4AF37] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest mb-6">Contact Us</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-gray-400">
              <MapPin className="text-[#D4AF37] mt-1 shrink-0" size={18} />
              <span className="font-light">123 Luxury Avenue, Suite 400<br />New York, NY 10012</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Phone className="text-[#D4AF37] shrink-0" size={18} />
              <span className="font-light">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest mb-6">Working Hours</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-gray-400">
              <Clock className="text-[#D4AF37] mt-1 shrink-0" size={18} />
              <div className="w-full font-light text-sm">
                <div className="flex justify-between border-b border-gray-800 pb-2 mb-2">
                  <span>Mon - Fri</span>
                  <span className="text-white">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2 mb-2">
                  <span>Saturday</span>
                  <span className="text-white">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-[#D4AF37] font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-1">
          <h3 className="text-white font-bold uppercase tracking-widest mb-6">Newsletter</h3>
          <p className="text-gray-400 font-light text-sm mb-4">Subscribe for exclusive offers and styling tips.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <Input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
            <Button type="submit" disabled={status.loading} className="w-full">{status.loading ? 'Subscribing...' : 'Subscribe'}</Button>
            {status.message && <p className="text-green-500 text-xs mt-1 font-bold">{status.message}</p>}
            {status.error && <p className="text-red-500 text-xs mt-1 font-bold">{status.error}</p>}
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 text-center border-t border-gray-800 pt-8 text-gray-600 text-sm font-light uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Trendhood Hair Salon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
