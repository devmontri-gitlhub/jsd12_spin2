import React from 'react';

const Home = () => {
  return (
    <div className="relative h-[80vh] flex items-center justify-center bg-gray-900 overflow-hidden text-white">
      {/* ส่วนนี้ไว้ใส่ Background Image ในอนาคต */}
      <div className="absolute inset-0 opacity-40 bg-[url('your-image-path.jpg')] bg-cover bg-center"></div>
      
      <div className="relative z-10 text-center space-y-6 px-4">
        <p className="text-lg md:text-xl font-light tracking-widest uppercase">We are providing</p>
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter">
          Cr:ative
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 text-sm font-semibold tracking-widest uppercase border-t border-b border-white/30 py-4">
          <span>Manually Crafted</span>
          <span className="hidden md:inline">•</span>
          <span>Human Art Only</span>
        </div>
      </div>

      {/* Pagination dots ด้านล่างขวาตามรูป */}
      <div className="absolute bottom-10 right-10 flex space-x-2">
        <div className="w-8 h-1 bg-white opacity-50"></div>
        <div className="w-8 h-1 bg-white"></div>
        <div className="w-8 h-1 bg-white opacity-50"></div>
      </div>
    </div>
  );
};

export default Home;