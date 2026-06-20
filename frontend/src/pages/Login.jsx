import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple hardcoded authentication for demonstration
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin-dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-[#1e1e1e] p-10 rounded-2xl shadow-xl border border-gray-800 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-tight">Admin Login</h2>
        <p className="text-gray-400 text-sm text-center mb-8">Sign in to manage your salon</p>
        
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Username</label>
            <input 
              type="text" 
              name="username" 
              value={credentials.username} 
              onChange={handleChange} 
              className="w-full p-4 bg-[#121212] border border-gray-700 rounded-xl text-white outline-none focus:border-[#D4AF37] transition-colors" 
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              value={credentials.password} 
              onChange={handleChange} 
              className="w-full p-4 bg-[#121212] border border-gray-700 rounded-xl text-white outline-none focus:border-[#D4AF37] transition-colors" 
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full py-4 mt-2 bg-[#D4AF37] hover:bg-[#F3CE52] text-[#121212] rounded-xl font-bold text-sm uppercase tracking-widest transition-colors">
            Login Securely
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
