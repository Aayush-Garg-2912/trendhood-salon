import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Star } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', rating: 5, review: '' });
  const [formStatus, setFormStatus] = useState({ loading: false, message: '', error: '' });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/api/reviews/approved');
        setReviews(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, message: '', error: '' });
    try {
      await api.post('/api/reviews/add', formData);
      setFormStatus({ loading: false, message: 'Thank you! Your review has been submitted for moderation.', error: '' });
      setFormData({ name: '', rating: 5, review: '' });
    } catch (err) {
      setFormStatus({ loading: false, message: '', error: 'Failed to submit review.' });
    }
  };

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Client Experiences</h2>
        <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full mb-6"></div>
      </div>
      
      {loading ? <Spinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reviews.map(t => (
            <GlassCard key={t._id} className="p-8 relative flex flex-col">
              <div className="flex text-[#D4AF37] mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" className="mr-1" />)}
              </div>
              <p className="text-gray-300 font-light italic mb-8 flex-grow">"{t.review}"</p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-[#121212] border border-gray-800 flex items-center justify-center text-[#D4AF37] font-bold shadow-inner">
                  {t.name.charAt(0)}
                </div>
                <span className="text-white font-semibold text-sm tracking-wide">{t.name}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      <GlassCard className="max-w-2xl mx-auto p-8 border-t-4 border-t-[#D4AF37]">
        <h3 className="text-2xl font-bold text-white mb-2 text-center">Leave a Review</h3>
        <p className="text-gray-400 text-sm text-center mb-8">We value your feedback. Let us know about your experience!</p>
        
        {formStatus.message && <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-lg mb-6 text-center text-sm font-semibold">{formStatus.message}</div>}
        {formStatus.error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6 text-center text-sm font-semibold">{formStatus.error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input label="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button key={num} type="button" onClick={() => setFormData({...formData, rating: num})} className={`p-2 rounded-lg border transition-colors ${formData.rating >= num ? 'text-[#D4AF37] border-[#D4AF37] bg-[#D4AF37]/10' : 'text-gray-600 border-gray-700 hover:border-gray-500'}`}>
                   <Star size={24} fill={formData.rating >= num ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>
          <Input type="textarea" label="Your Experience" rows="3" value={formData.review} onChange={(e) => setFormData({...formData, review: e.target.value})} required />
          <Button type="submit" disabled={formStatus.loading} className="mt-2">{formStatus.loading ? 'Submitting...' : 'Submit Review'}</Button>
        </form>
      </GlassCard>
    </section>
  );
};

export default Testimonials;
