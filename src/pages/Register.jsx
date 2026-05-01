import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockUsers } from '../data/mockUsers';

// --- Import รูปภาพตาม Path ของคุณ ---
import bgDesktop from "../assets/images/bg_pages_register_destop.png";
import bgMobile from "../assets/images/bg_pages_register_mobile.png";
import imgRegisterDesktop from "../assets/images/img_register_desktop.png";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '', email: '', password: '', confirmPassword: ''
  });
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, userAnswer: '' });
  const [captchaError, setCaptchaError] = useState('');

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1: n1, num2: n2, userAnswer: '' });
    setCaptchaError('');
  };

  useEffect(() => { generateCaptcha(); }, []);

  const handleChange = (e) => {
    if (e.target.name === 'userAnswer') {
      setCaptcha({ ...captcha, userAnswer: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(captcha.userAnswer) !== captcha.num1 + captcha.num2) {
      setCaptchaError('Incorrect!');
      generateCaptcha();
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const storedUsers = JSON.parse(localStorage.getItem('users')) || mockUsers;
    const newUser = { id: storedUsers.length + 1, ...formData, role: 'buyer' };
    localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
    alert("Registration Successful!");
    navigate('/login');
  };

  return (
    
    <div className="w-full h-[100dvh] relative flex items-center justify-center overflow-hidden origin-center bg-cover bg-center bg-no-repeat md:bg-[url('/path-to-your-desktop-bg.png')] bg-[url('/path-to-your-mobile-bg.png')]">

    <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
    style={{ 
      backgroundImage: `url(${window.innerWidth >= 768 ? bgDesktop : bgMobile})` 
    }}
  />  

     
      <div className="scale-90 relative z-10 bg-[#8b84d7] w-full max-w-[400px] md:max-w-[850px] min-h-[500px] md:min-h-[600px] h-auto rounded-[30px] md:rounded-[40px] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/10 mx-auto my-auto py-10 px-6 md:p-0">
        
       
        <div className="hidden md:block w-1/2 p-6">
          <img 
            src={imgRegisterDesktop} 
            alt="Taxi" 
            className="w-full h-full object-cover rounded-[30px]"
          />
        </div>

        
        <div className="w-full md:w-1/2 p-0 md:p-10 flex flex-col justify-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 md:mb-10 text-[#1e1a3d]">Register</h2>

         
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" name="address" placeholder="Enter your address" 
              className="w-full px-6 py-3 md:py-3.5 rounded-full bg-[#a9a4e4] placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-white/40 text-sm shadow-inner"
              value={formData.address} onChange={handleChange} required 
            />
            
            <input 
              type="email" name="email" placeholder="Enter your email address" 
              className="w-full px-6 py-3 md:py-3.5 rounded-full bg-[#a9a4e4] placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-white/40 text-sm shadow-inner"
              value={formData.email} onChange={handleChange} required 
            />
            <input 
              type="password" name="password" placeholder="Enter your password" 
              className="w-full px-6 py-3 md:py-3.5 rounded-full bg-[#a9a4e4] placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-white/40 text-sm shadow-inner"
              value={formData.password} onChange={handleChange} required 
            />
            <input 
              type="password" name="confirmPassword" placeholder="Enter password confirmation" 
              className="w-full px-6 py-3 md:py-3.5 rounded-full bg-[#a9a4e4] placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-white/40 text-sm shadow-inner"
              value={formData.confirmPassword} onChange={handleChange} required 
            />

            {/* Captcha - เหมือนเดิมแต่ปรับ padding นิดหน่อย */}
            <div className="flex items-center gap-3 bg-[#1e1a3d]/20 p-2.5 rounded-full">
              <span className="bg-[#1e1a3d] px-4 py-1 rounded-full font-bold text-sm">
                {captcha.num1} + {captcha.num2} =
              </span>
              <input
                type="number" name="userAnswer" placeholder="?"
                className="w-16 p-2 rounded-lg bg-white text-[#1e1a3d] text-center font-bold outline-none"
                value={captcha.userAnswer} onChange={handleChange} required
              />
            </div>

            {/* ปุ่ม - ปรับ mt-4 และ font-extrabold */}
            <button
              type="submit"
              className="w-full py-3.5 mt-4 bg-[#1e1a3d] hover:bg-[#2d2859] text-white font-extrabold rounded-full shadow-xl transition-all active:scale-95"
            >
              Create an account
            </button>
          </form>

          {/* ลิงก์ด้านล่าง - ปรับ text-center md:text-left */}
          <p className="mt-6 text-center text-xs md:text-sm">
            Already have one? <Link to="/login" className="font-extrabold underline hover:text-white">Login</Link>
          </p>
        </div>
      </div>

  </div>
  );
};

export default Register;