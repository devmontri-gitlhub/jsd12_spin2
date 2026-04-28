import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContent, mockUsers } from '../data/mockUsers';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // จำลองการเก็บข้อมูลลง Mock Data (ในฐานะ Buyer)
    const newUser = {
      id: mockUsers.length + 1,
      ...formData,
      role: 'buyer'
    };
    console.log("Registered User:", newUser);
    alert("Registration Successful!");
    navigate('/login'); // เมื่อสมัครเสร็จให้ไปหน้า Login
  };

  return (
    // Background หลักของหน้าจอ (สามารถเปลี่ยนรูปได้ที่นี่)
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      
      {/* Container หลัก: ปรับจาก 1 คอลัมน์ (Mobile) เป็น 2 คอลัมน์ (Desktop) */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-[#7D78D2] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* ส่วนรูปภาพด้านซ้าย (ซ่อนบน Mobile ตามดีไซน์ หรือจะโชว์ก็ได้) */}
        <div className="hidden md:block md:w-1/2 p-6">
          <div className="h-full w-full rounded-2xl overflow-hidden relative">
             {/* ใส่รูปภาพแบคกราวด์ที่นี่ */}
            <img 
              src="https://via.placeholder.com/600x800" 
              alt="Register Art" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white text-xs opacity-70">
              shot by inwza
            </div>
          </div>
        </div>

        {/* ส่วน Form ด้านขวา */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {authContent.registerTitle}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="address"
              placeholder={authContent.placeholders.address}
              className="w-full p-4 rounded-xl bg-[#ABA7EB] placeholder-white/80 text-white outline-none focus:ring-2 focus:ring-white/50 transition-all"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={authContent.placeholders.email}
              className="w-full p-4 rounded-xl bg-[#ABA7EB] placeholder-white/80 text-white outline-none focus:ring-2 focus:ring-white/50 transition-all"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder={authContent.placeholders.password}
              className="w-full p-4 rounded-xl bg-[#ABA7EB] placeholder-white/80 text-white outline-none focus:ring-2 focus:ring-white/50 transition-all"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder={authContent.placeholders.confirmPassword}
              className="w-full p-4 rounded-xl bg-[#ABA7EB] placeholder-white/80 text-white outline-none focus:ring-2 focus:ring-white/50 transition-all"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full py-4 mt-4 bg-[#2D2A54] hover:bg-[#1E1C3A] text-white font-semibold rounded-xl shadow-lg transition-colors duration-300"
            >
              Create an account
            </button>
          </form>

          {/* ลิงก์กลับไปหน้า Login */}
          <p className="mt-8 text-center text-sm text-white/80">
            Already have one?{' '}
            <Link to="/login" className="font-bold underline hover:text-white">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;