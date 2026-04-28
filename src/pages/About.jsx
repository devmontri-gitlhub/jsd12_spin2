import React from 'react';

const About = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white p-8 font-sans">
      
      {/* ส่วนหัวข้อ */}
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          About Us
        </h1>
        
        {/* เส้นขีดคั่นกลางเพิ่มความสวยงาม */}
        <div className="w-20 h-1 bg-[#7D78D2] mx-auto rounded-full"></div>

        {/* เนื้อหาตัวอย่าง */}
        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            Welcome to <span className="font-semibold text-black">Creative Market</span>. 
            We are a community-driven platform dedicated to showcasing the beauty of 
            manually crafted art and human creativity.
          </p>
          
          <p>
            Our mission is simple: to provide a space where artists and buyers can 
            connect through authentic, non-automated masterpieces. Whether you are 
            an enthusiast looking for a unique piece or a creator ready to share 
            your vision, you belong here.
          </p>
        </div>

        {/* ส่วนปุ่ม Action เล็กๆ (ตัวอย่าง) */}
        <div className="pt-8">
          <button className="px-8 py-3 bg-[#7D78D2] text-white rounded-full hover:bg-[#6b66c4] transition-all shadow-md active:scale-95">
            Learn More
          </button>
        </div>
      </div>

      {/* ส่วน Footer จำลอง หรือข้อมูลติดต่อเล็กๆ */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl border-t border-gray-100 pt-10 text-center">
        <div>
          <h3 className="font-bold text-gray-900">Our Vision</h3>
          <p className="text-sm text-gray-500 mt-2">Empowering human artists in the digital age.</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Quality</h3>
          <p className="text-sm text-gray-500 mt-2">Every piece is verified for authenticity.</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Community</h3>
          <p className="text-sm text-gray-500 mt-2">Built for creators, by creators.</p>
        </div>
      </div>
      
    </div>
  );
};

export default About;