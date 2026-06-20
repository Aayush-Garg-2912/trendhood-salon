import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import GlassCard from '../../ui/GlassCard';

const Scheduler = ({ selectedServices, onBack, onSuccess }) => {
  const [formData, setFormData] = useState({ customerName: '', phone: '', appointmentDate: '', timeSlot: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleBook = async (e) => {
    e.preventDefault();
    if (!formData.appointmentDate || !formData.timeSlot) {
      return alert("Please select a date and time");
    }
    
    const dateTime = new Date(`${formData.appointmentDate}T${formData.timeSlot}`);
    setLoading(true);

    try {
      await axios.post('/api/appointments/book', {
        customerName: formData.customerName,
        phone: formData.phone,
        services: selectedServices.map(s => s._id),
        appointmentDate: dateTime
      });
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Schedule Appointment</h2>
        <p className="text-gray-400 text-sm mt-2">Choose a date and time for your visit.</p>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6 text-center">{error}</div>}

      <form onSubmit={handleBook} className="flex flex-col gap-6">
        <Input label="Full Name" name="customerName" value={formData.customerName} onChange={handleChange} required placeholder="John Doe" />
        <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 234 567 890" />
        
        <div className="flex gap-4">
          <Input label="Date" type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required className="w-full" />
          <Input label="Time" type="time" name="timeSlot" value={formData.timeSlot} onChange={handleChange} required className="w-full" />
        </div>
        
        <div className="flex gap-4 mt-4">
          <Button type="button" variant="outline" onClick={onBack} className="w-full">Back</Button>
          <Button type="submit" disabled={loading} className="w-full">{loading ? 'Checking...' : 'Confirm Booking'}</Button>
        </div>
      </form>
    </GlassCard>
  );
};

export default Scheduler;
