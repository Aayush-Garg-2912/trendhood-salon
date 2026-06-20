import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ customerName: '', phone: '', service: '', appointmentDate: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try { const response = await axios.get('/api/services/get'); setServices(response.data); } catch (e) {}
    };
    fetchServices();
  }, []);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await axios.post('/api/appointments/book', formData);
      alert('Appointment Booked Successfully!');
      setFormData({ customerName: '', phone: '', service: '', appointmentDate: '' });
    } catch (error) { alert('Failed to book appointment.'); } finally { setLoading(false); }
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto bg-[#121212] rounded-xl shadow-xl overflow-hidden p-8 border border-gray-800">
      <div className="mb-6 border-b border-gray-800 pb-4 text-center">
        <h2 className="text-3xl font-bold text-white tracking-tight">Reserve Your Spot</h2>
        <p className="text-gray-400 text-sm mt-2 font-light">Select your service and choose a time.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
            <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required placeholder="Jane Doe" className="w-full p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="(555) 123-4567" className="w-full p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Premium Service</label>
          <select name="service" value={formData.service} onChange={handleChange} required className="w-full p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white outline-none focus:border-[#D4AF37] transition-colors appearance-none">
            <option value="" disabled className="text-gray-500">Select a service</option>
            {services.map(s => (
              <option key={s._id} value={s._id}>{s.name} - ${s.price}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Date & Time</label>
          <input type="datetime-local" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required className="w-full p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white outline-none focus:border-[#D4AF37] transition-colors [color-scheme:dark]" />
        </div>
        <button type="submit" disabled={loading} className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-widest transition-colors ${loading ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-[#D4AF37] text-[#121212] hover:bg-[#F3CE52]'}`}>
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
