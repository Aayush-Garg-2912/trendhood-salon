import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Pencil, Trash2, Plus, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1e1e1e] border border-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><XCircle size={24} /></button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const ServicesTab = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ _id: null, name: '', description: '', price: '', duration: '', category: '', imageUrl: '' });

  const fetchServices = async () => {
    const res = await api.get('/api/services/get');
    setServices(res.data);
  };
  useEffect(() => { fetchServices(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this service?")) {
      await api.delete(`/api/services/${id}`);
      fetchServices();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload._id) delete payload._id;

      if (formData._id) {
        await api.put(`/api/services/${formData._id}`, payload);
      } else {
        await api.post('/api/services/add', payload);
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      alert("Error saving service: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Services</h2>
        <button onClick={() => { setFormData({ _id: null, name: '', description: '', price: '', duration: '', category: '', imageUrl: '' }); setModalOpen(true); }} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold uppercase"><Plus size={16}/> Add Service</button>
      </div>
      <div className="bg-[#1e1e1e] rounded-xl border border-gray-800 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#121212] border-b border-gray-800 uppercase text-xs tracking-widest">
            <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Actions</th></tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s._id} className="border-b border-gray-800/50 hover:bg-white/5">
                <td className="px-6 py-4 text-white font-medium">{s.name}</td>
                <td className="px-6 py-4">${s.price}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button onClick={() => { setFormData(s); setModalOpen(true); }} className="text-blue-500 hover:text-blue-400"><Pencil size={18} /></button>
                  <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:text-red-400"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={formData._id ? "Edit Service" : "Add Service"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <Input label="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
          <Input label="Image URL" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
          <Input type="textarea" label="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <div className="flex gap-4">
            <Input label="Price" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            <Input label="Duration" type="number" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} required />
          </div>
          <Button type="submit" className="mt-4">Save</Button>
        </form>
      </Modal>
    </div>
  );
};

const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => { fetchAppts(); }, []);
  const fetchAppts = async () => {
    const res = await api.get('/api/appointments/get');
    setAppointments(res.data.data);
  };
  const handleStatus = async (id, status) => {
    await api.put(`/api/appointments/${id}/status`, { status });
    fetchAppts();
  };
  const handleDelete = async (id) => {
    if (window.confirm("Delete appointment?")) {
      await api.delete(`/api/appointments/${id}`);
      fetchAppts();
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Appointments</h2>
      <div className="bg-[#1e1e1e] rounded-xl border border-gray-800 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#121212] border-b border-gray-800 uppercase text-xs tracking-widest">
            <tr><th className="px-6 py-4">Client</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Actions</th></tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a._id} className="border-b border-gray-800/50 hover:bg-white/5">
                <td className="px-6 py-4 text-white font-medium">{a.customerName} <br/><span className="text-xs text-gray-500">{a.phone}</span></td>
                <td className="px-6 py-4">{new Date(a.appointmentDate).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <select value={a.status} onChange={e => handleStatus(a._id, e.target.value)} className="bg-[#121212] border border-gray-700 rounded p-1 text-xs text-white">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button onClick={() => handleDelete(a._id)} className="text-red-500 hover:text-red-400"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ReviewsTab = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => { fetchReviews(); }, []);
  const fetchReviews = async () => {
    const res = await api.get('/api/reviews/all');
    setReviews(res.data.data);
  };
  const toggleApprove = async (id, current) => {
    await api.put(`/api/reviews/${id}/status`, { approved: !current });
    fetchReviews();
  };
  const handleDelete = async (id) => {
    if (window.confirm("Delete review?")) {
      await api.delete(`/api/reviews/${id}`);
      fetchReviews();
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Reviews</h2>
      <div className="bg-[#1e1e1e] rounded-xl border border-gray-800 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#121212] border-b border-gray-800 uppercase text-xs tracking-widest">
            <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Rating</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Actions</th></tr>
          </thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r._id} className="border-b border-gray-800/50 hover:bg-white/5">
                <td className="px-6 py-4 text-white font-medium">{r.name}</td>
                <td className="px-6 py-4">{r.rating}/5</td>
                <td className="px-6 py-4">
                  <button onClick={() => toggleApprove(r._id, r.approved)} className={`px-2 py-1 text-xs rounded border ${r.approved ? 'border-green-500 text-green-500' : 'border-gray-500 text-gray-500'}`}>
                    {r.approved ? 'Approved' : 'Pending'}
                  </button>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button onClick={() => handleDelete(r._id)} className="text-red-500 hover:text-red-400"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GalleryTab = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ imageUrl: '', caption: '' });

  const fetchImages = async () => {
    const res = await api.get('/api/gallery/get');
    setImages(res.data.data);
  };
  useEffect(() => { fetchImages(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete image?")) {
      await api.delete(`/api/gallery/${id}`);
      fetchImages();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/gallery/add', formData);
      setModalOpen(false);
      fetchImages();
    } catch (err) {
      alert("Error adding image: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gallery</h2>
        <button onClick={() => { setFormData({ imageUrl: '', caption: '' }); setModalOpen(true); }} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold uppercase"><Plus size={16}/> Add Image</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img._id} className="relative group rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-800">
            <img src={img.imageUrl} alt={img.caption} className="w-full aspect-square object-cover" />
            <button onClick={() => handleDelete(img._id)} className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Gallery Image">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Image URL" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} required />
          <Input label="Caption" value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} />
          <Button type="submit" className="mt-4">Save</Button>
        </form>
      </Modal>
    </div>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button onClick={onClick} className={`text-left px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors ${active ? 'bg-[#D4AF37] text-[#121212]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
    {children}
  </button>
);

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('services');
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  };

  return (
    <div className="flex min-h-[80vh] bg-[#121212] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden mt-8">
      <div className="w-64 bg-[#1a1a1a] border-r border-gray-800 flex flex-col p-6">
        <h2 className="text-xl font-bold text-white mb-8 tracking-widest uppercase">Admin</h2>
        <nav className="flex flex-col gap-2 flex-grow">
          <TabButton active={activeTab === 'services'} onClick={() => setActiveTab('services')}>Services</TabButton>
          <TabButton active={activeTab === 'appointments'} onClick={() => setActiveTab('appointments')}>Appointments</TabButton>
          <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>Reviews</TabButton>
          <TabButton active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')}>Gallery</TabButton>
        </nav>
        <button onClick={handleLogout} className="mt-auto py-3 border border-red-900/50 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors uppercase text-xs font-bold tracking-widest">Logout</button>
      </div>
      <div className="flex-1 p-8 overflow-y-auto max-h-[80vh]">
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'appointments' && <AppointmentsTab />}
        {activeTab === 'reviews' && <ReviewsTab />}
        {activeTab === 'gallery' && <GalleryTab />}
      </div>
    </div>
  );
};

export default AdminPanel;
