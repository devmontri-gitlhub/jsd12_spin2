import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockUsers } from '../data/mockUsers';

// --- Import รูปภาพตาม Path ของคุณ ---
import bgDesktop from "../assets/images/t_pages_register_destop_bg.png";
import bgMobile from "../assets/images/t_pages_register_mobile_bg.png";
import imgRegisterDesktop from "../assets/images/t_pages_register_desktop_texi.png";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '', email: '', password: '', confirmPassword: ''
  });
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, userAnswer: '' });
  const [captchaError, setCaptchaError] = useState('');

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);




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
    
    <div className="fixed inset-0  w-full h-[1000px] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat md:bg-[url('/path-to-your-desktop-bg.png')] bg-[url('/path-to-your-mobile-bg.png')]">
    <div 
    className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-500"
    style={{ 
      backgroundImage: `url(${window.innerWidth >= 768 ? bgDesktop : bgMobile})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center' 
    }}
  />  

     
      <div className="scale-80 relative z-10 bg-[#8b84d7]/60 w-full max-w-[400px] md:max-w-[1096px] min-h-[500px] md:min-h-[688px] h-auto rounded-[24px] md:rounded-[24px] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/10 mx-auto mt-0 -translate-y-50 md:-translate-y-43.5 py-10 px-6 md:p-0">
        
       
        <div className="hidden md:block w-1/2 p-6">
          <img 
            src={imgRegisterDesktop} 
            alt="Taxi" 
            className="w-full h-full object-cover rounded-[30px]"
          />
        </div>

        
        <div className="w-full md:w-1/2 p-0 md:p-10 flex flex-col justify-center text-white">
          <h2 className="!text-[48px] !font-bold !text-center mb-8 md:mb-10 !text-[#ffffff] mx-auto mt-0 -translate-y-5 md:-translate-y-5">
            Register
          </h2>

         
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
                type="text" 
                name="address" 
                placeholder="Enter your address" 
                className="w-full px-6 py-3 md:py-3.5 rounded-full bg-[#a9a4e4] placeholder-white/80 text-white border-2 border-white outline-none focus:ring-4 focus:ring-white/50 text-sm shadow-lg"
                value={formData.address} 
                onChange={handleChange} 
                required 
              />
            
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email address" 
              className="w-full px-6 py-3 md:py-3.5 rounded-full bg-[#a9a4e4] placeholder-white/80 text-white border-2 border-white outline-none focus:ring-4 focus:ring-white/50 text-sm shadow-lg"
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              className="w-full px-6 py-3 md:py-3.5 rounded-full bg-[#a9a4e4] placeholder-white/80 text-white border-2 border-white outline-none focus:ring-4 focus:ring-white/50 text-sm shadow-lg"
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Enter password confirmation" 
              className="w-full px-6 py-3 md:py-3.5 rounded-full bg-[#a9a4e4] placeholder-white/80 text-white border-2 border-white outline-none focus:ring-4 focus:ring-white/50 text-sm shadow-lg"
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
            />

            {/* Captcha - เหมือนเดิมแต่ปรับ padding นิดหน่อย */}
            <div className="flex items-center justify-center gap-3 bg-[#1e1a3d]/70 p-2.5 rounded-full">
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
              className="w-full py-5 mt-4 bg-[#1e1a3d] hover:bg-[#2d2859] hover:brightness-150 text-white text-xl font-bold rounded-full shadow-xl transition-all active:scale-95"
            >
              Create an account
            </button>
          </form>

          {/* ลิงก์ด้านล่าง - ปรับ text-center md:text-left */}
          <p className="text-center text-xs md:text-sm mx-auto mt-0 translate-y-5 md:translate-y-2.5">
            Already have one? <Link to="/login" className="font-extrabold underline hover:text-white">Login</Link>
          </p>
        </div>
      </div>

  </div>
  );
};

export default Register;