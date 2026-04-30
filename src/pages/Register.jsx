import React, { useState, useEffect } from 'react';
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

  // --- ระบบ CAPTCHA State ---
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, userAnswer: '' });
  const [captchaError, setCaptchaError] = useState('');

  // ฟังก์ชันสุ่มโจทย์เลขใหม่
  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1: n1, num2: n2, userAnswer: '' });
    setCaptchaError('');
  };

  // สุ่มโจทย์ครั้งแรกเมื่อโหลดหน้าเว็บ
  useEffect(() => {
    generateCaptcha();
  }, []);
  // -------------------------

  const handleChange = (e) => {
    if (e.target.name === 'userAnswer') {
      setCaptcha({ ...captcha, userAnswer: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. ตรวจสอบ CAPTCHA
    if (parseInt(captcha.userAnswer) !== captcha.num1 + captcha.num2) {
      setCaptchaError('Captcha incorrect! Please try again.');
      generateCaptcha(); // สุ่มโจทย์ใหม่ทันทีถ้าตอบผิด
      return;
    }

    // 2. ตรวจสอบรหัสผ่าน
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // 3. บันทึกข้อมูลลง LocalStorage (ตาม Logic เดิม)
    const storedUsers = JSON.parse(localStorage.getItem('users')) || mockUsers;
    const newUser = {
      id: storedUsers.length + 1,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      role: 'buyer'
    };

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert("Registration Successful!");
    navigate('/login'); 
  };

// ส่วนแสดงผลใน Register.jsx
return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
    {/* ลด max-w-4xl เป็น max-w-3xl และจำกัดความสูงสูงสุดบน Desktop */}
    <div className="flex flex-col md:flex-row w-full max-w-3xl bg-[#7D78D2] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 md:max-h-[600px]">
      
      {/* Left Side Art - ลดขนาดสัดส่วนลง */}
      <div className="hidden md:block md:w-[40%] bg-indigo-900">
        <img 
          src="https://via.placeholder.com/600x800" 
          alt="Register Art" 
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Right Side Form - ลด Padding และขนาด Element */}
      <div className="w-full md:w-[60%] p-6 md:p-10 flex flex-col justify-center text-white overflow-y-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          {authContent.registerTitle}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* ปรับขนาด Input ให้กะทัดรัดขึ้น */}
          <input type="text" name="address" placeholder={authContent.placeholders.address} className="w-full p-3 rounded-xl bg-[#ABA7EB] placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/50 text-sm" value={formData.address} onChange={handleChange} required />
          <input type="email" name="email" placeholder={authContent.placeholders.email} className="w-full p-3 rounded-xl bg-[#ABA7EB] placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/50 text-sm" value={formData.email} onChange={handleChange} required />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="password" name="password" placeholder="Password" className="w-full p-3 rounded-xl bg-[#ABA7EB] placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/50 text-sm" value={formData.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm" className="w-full p-3 rounded-xl bg-[#ABA7EB] placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/50 text-sm" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          {/* CAPTCHA - ปรับขนาดให้เล็กลง */}
          <div className="bg-[#5C57B0] p-3 rounded-xl border border-white/20">
            <label className="block text-[10px] uppercase tracking-wider mb-1 opacity-80">Human Check</label>
            <div className="flex items-center gap-3">
              <span className="text-lg font-mono font-bold bg-[#7D78D2] px-3 py-1 rounded-lg border border-dashed border-white/30">
                {captcha.num1}+{captcha.num2}
              </span>
              <input
                type="number"
                name="userAnswer"
                placeholder="?"
                className="w-20 p-2 rounded-lg bg-white text-[#2D2A54] outline-none text-center font-bold"
                value={captcha.userAnswer}
                onChange={handleChange}
                required
              />
            </div>
            {captchaError && <p className="text-red-300 text-[10px] mt-1 italic">{captchaError}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-[#2D2A54] hover:bg-[#1E1C3A] text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-white/70">
          Already have one? <Link to="/login" className="font-bold underline hover:text-white">Login</Link>
        </p>
      </div>
    </div>
  </div>
);
};

export default Register;