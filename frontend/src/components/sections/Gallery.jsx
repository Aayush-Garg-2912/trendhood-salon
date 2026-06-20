import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/gallery/get');
        setImages(response.data.data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };
    fetchImages();
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="py-16 border-t border-gray-800/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Our Work</h2>
        <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        <p className="text-gray-400 mt-4 font-light">A glimpse into our premium styling and treatments.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((item, index) => (
          <div key={index} className="relative group overflow-hidden rounded-xl aspect-square bg-[#1e1e1e]">
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-white font-bold tracking-wide">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
