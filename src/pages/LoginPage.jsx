import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../data/mockUsers';

// --- นำเข้าไฟล์รูปภาพ ---
import bgDesktop from "../assets/images/bg_pages_login_destop.jpg"; 
import bgMobile from "../assets/images/bg_pages_login_moble.png"; 
import logoLogin from "../assets/logos/Logo_login.png"; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const allUsers = [...mockUsers, ...storedUsers];

    const user = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert(`Welcome back!`);
      window.location.href = '/'; 
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    /* 
      1. ปรับ Background หลัก:
      - ใช้ h-screen และ w-full เพื่อบังคับขนาดให้เท่าหน้าจอ Browser เสมอ
      - md:bg-[url(...)] สลับรูป Desktop เมื่อจอใหญ่กว่า 768px
      - bg-cover และ bg-center เพื่อให้ภาพขยายพอดีและอยู่ตรงกลาง
      - bg-no-repeat ป้องกันภาพซ้ำ
    */
    <div 
      className="h-screen w-full flex items-center justify-center p-6 overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('../assets/images/bg_pages_login_moble.png')] md:bg-[url('../assets/images/bg_pages_login_destop.jpg')]"
      style={{ backgroundImage: `url(${window.innerWidth < 768 ? bgMobile : bgDesktop})` }}
    >
      {/* 2. การ์ด Login (ดีไซน์ตาม Page_login_Example.png) */}
      <div className="bg-[#7b74c4]/90 backdrop-blur-md w-full max-w-[420px] rounded-[40px] shadow-2xl p-10 text-center border border-white/20 animate-fadeIn">
        
        {/* 3. Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src={logoLogin} 
            alt="Creative Market Logo" 
            className="w-[85%] h-auto object-contain"
          />
        </div>
        
        {/* 4. Form Inputs (ทรงมน Pill Shape) */}
        <div className="space-y-4 text-left">
          <label className="block text-white text-sm font-medium mb-1 pl-4 opacity-90">
            Enter your email
          </label>
          
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full bg-[#a9a4e4] text-white placeholder-white/70 px-6 py-3.5 rounded-full outline-none focus:ring-2 focus:ring-white/40 text-sm shadow-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full bg-[#a9a4e4] text-white placeholder-white/70 px-6 py-3.5 rounded-full outline-none focus:ring-2 focus:ring-white/40 text-sm shadow-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 5. Login Button */}
        <button 
          onClick={handleLogin}
          className="w-full mt-8 bg-[#2d2859] hover:bg-[#1e1a3d] text-white font-bold py-3.5 rounded-full shadow-xl transition-all active:scale-95"
        >
          Login
        </button>

        {/* 6. Footer Links */}
        <div className="mt-6 text-sm text-white/90 space-y-2">
          <p className="cursor-pointer hover:text-white transition-colors hover:underline">
            forgot your password?
          </p>
          <p>
            Not have one ?{' '}
            <span 
              className="font-extrabold underline cursor-pointer hover:text-white" 
              onClick={() => navigate('/register')}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;