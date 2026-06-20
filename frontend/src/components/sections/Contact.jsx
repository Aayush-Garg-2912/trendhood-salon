import React, { useState } from 'react';
import api from '../../utils/api';
import GlassCard from '../ui/GlassCard';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/contact', formData);
      setStatus('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <section className="py-20" id="contact">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In <span className="text-[#D4AF37]">Touch</span></h2>
        <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full mb-6"></div>
        <p className="text-gray-400">Have a question or need special accommodations? Reach out to our front desk directly.</p>
      </div>
      <GlassCard className="max-w-2xl mx-auto p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <Input label="Email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <Input label="Message" type="textarea" rows="4" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
          <Button type="submit">Send Message</Button>
          {status && <p className={`text-center mt-4 font-bold ${status.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{status}</p>}
        </form>
      </GlassCard>
    </section>
  );
};

export default Contact;
