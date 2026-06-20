import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import Button from '../../ui/Button';
import GlassCard from '../../ui/GlassCard';
import Spinner from '../../ui/Spinner';

const PricingCalculator = ({ onNext }) => {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/api/services/get');
        setServices(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const toggleService = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const selectedData = services.filter(s => selected.includes(s._id));
  const totalPrice = selectedData.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedData.reduce((sum, s) => sum + s.duration, 0);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">Build Your Package</h2>
        <p className="text-gray-400">Select the services you'd like to book.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {services.map(s => {
          const isSelected = selected.includes(s._id);
          return (
            <GlassCard 
              key={s._id} 
              hover
              className={`p-4 cursor-pointer transition-all ${isSelected ? 'border-[#D4AF37] bg-[#D4AF37]/10' : ''}`}
              onClick={() => toggleService(s._id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-white">{s.name}</h3>
                  <p className="text-sm text-gray-400">{s.duration} mins</p>
                </div>
                <div className="text-[#D4AF37] font-bold">${s.price}</div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="bg-[#1e1e1e]/80 backdrop-blur-md p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="text-gray-400 text-sm uppercase tracking-widest font-bold">Estimated Total</div>
          <div className="text-3xl font-bold text-white">${totalPrice} <span className="text-sm text-gray-500 font-normal">/ {totalDuration} mins</span></div>
        </div>
        <Button onClick={() => onNext(selected)} disabled={selected.length === 0}>
          Proceed to Schedule
        </Button>
      </div>
    </div>
  );
};

export default PricingCalculator;
