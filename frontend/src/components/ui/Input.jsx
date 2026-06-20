import React from 'react';

const Input = ({ label, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</label>}
      {props.type === 'textarea' ? (
        <textarea 
          className="w-full p-4 bg-[#1e1e1e]/60 backdrop-blur-md border border-white/5 rounded-xl text-white outline-none focus:border-[#D4AF37] transition-colors resize-none"
          {...props}
        />
      ) : (
        <input 
          className="w-full p-4 bg-[#1e1e1e]/60 backdrop-blur-md border border-white/5 rounded-xl text-white outline-none focus:border-[#D4AF37] transition-colors"
          {...props}
        />
      )}
    </div>
  );
};

export default Input;
