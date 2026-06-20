import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/ui/Spinner';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let activeRequests = 0;

    const reqInterceptor = axios.interceptors.request.use(config => {
      activeRequests++;
      setLoading(true);
      return config;
    }, error => Promise.reject(error));

    const resInterceptor = axios.interceptors.response.use(response => {
      activeRequests--;
      if (activeRequests <= 0) {
        activeRequests = 0;
        setLoading(false);
      }
      return response;
    }, error => {
      activeRequests--;
      if (activeRequests <= 0) {
        activeRequests = 0;
        setLoading(false);
      }
      return Promise.reject(error);
    });

    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ loading }}>
      {children}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A]/60 backdrop-blur-sm">
          <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-2xl border border-gray-800 flex flex-col items-center">
            <Spinner />
            <p className="text-[#D4AF37] font-bold mt-6 uppercase tracking-widest text-xs animate-pulse">Processing...</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};
