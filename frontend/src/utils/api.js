import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5000' : 'https://trendhood-salon.onrender.com',
  withCredentials: true
});

export default api;
