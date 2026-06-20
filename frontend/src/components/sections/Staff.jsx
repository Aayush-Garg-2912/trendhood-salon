import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlassCard from '../ui/GlassCard';
import Spinner from '../ui/Spinner';

const Staff = () => {
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const res = await axios.get('/api/stylists/get');
        setStylists(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStylists();
  }, []);

  if (loading) return <Spinner />;
  if (stylists.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Meet The Experts</h2>
        <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full mb-6"></div>
        <p className="text-gray-400 font-light max-w-2xl mx-auto">Our master stylists bring years of experience and unparalleled passion to every cut, color, and treatment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stylists.map(stylist => (
          <GlassCard key={stylist._id} hover className="flex flex-col group">
            <div className="h-80 overflow-hidden">
              <img src={stylist.imageUrl} alt={stylist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">{stylist.role}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{stylist.name}</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 flex-grow">{stylist.bio}</p>
              {stylist.specializations?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                  {stylist.specializations.map(spec => (
                    <span key={spec} className="px-3 py-1 bg-[#121212] rounded-md text-xs font-semibold uppercase tracking-wider text-gray-300 border border-gray-800">{spec}</span>
                  ))}
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Staff;
