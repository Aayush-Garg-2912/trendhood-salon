import axios from 'axios';

const api = axios.create({
  baseURL: 'https://trendhood-salon.onrender.com',
  withCredentials: true
});

export default api;
