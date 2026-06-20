import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import GlassCard from '../ui/GlassCard';
import Spinner from '../ui/Spinner';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/api/services/get');
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Our Signature Services</h2>
        <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full mb-6"></div>
        <p className="text-gray-400 font-light max-w-2xl mx-auto">Discover our curated selection of premium grooming treatments designed to elevate your style.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, idx) => (
          <GlassCard key={service._id} hover className={`p-6 flex flex-col ${idx === 0 || idx === 3 ? 'lg:col-span-2' : ''}`}>
            {service.imageUrl && (
              <div className="h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white">{service.name}</h3>
              <span className="text-[#D4AF37] font-bold text-xl">${service.price}</span>
            </div>
            <p className="text-gray-400 font-light text-sm mb-6 flex-grow leading-relaxed">{service.description}</p>
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-500 border-t border-white/5 pt-4 mt-auto">
              <span className="bg-[#121212] px-3 py-1 rounded-md border border-gray-800">{service.category}</span>
              <span>{service.duration} MINS</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
