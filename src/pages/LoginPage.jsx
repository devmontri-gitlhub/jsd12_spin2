import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { mockUsers } from '../data/mockUsers';

// --- Import รูปภาพ ---
import bgDesktop from "../assets/images/t_pages_login_destop_bg.jpg"; 
import bgMobile from "../assets/images/t_pages_login_moble_bg.png"; 
import logoLogin from "../assets/logos/t_pages_login_logo.png"; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
// --- 1. เพิ่มระบบตรวจสอบขนาดหน้าจอแบบ Real-time ---
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      newErrors.email = "Please enter your email!!";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format (e.g. name@mail.com)";
    }

    if (!password) {
      newErrors.password = "Please enter your password!!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    /* แก้ไขจุดที่ 3: เช็คว่า mockUsers มีอยู่จริงไหม ถ้าโดนคอมเมนต์ไว้ให้ใช้ [] แทน เพื่อป้องกัน Error และรวมข้อมูลกับ localStorage ได้อย่างปลอดภัย */
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const availableMockUsers = typeof mockUsers !== 'undefined' ? mockUsers : [];
    const allUsers = [...availableMockUsers, ...storedUsers];

    const user = allUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setErrors({});
      setIsSuccess(true);
    } else {
      setErrors({ password: "Invalid email or password!!" });
    }
  };

  return (
    /* แก้ไขจุดที่ 1: เปลี่ยน h-[1000px] เป็น h-screen เพื่อให้ความสูงพอดีกับหน้าต่างเบราว์เซอร์อัตโนมัติ */
    <div className="fixed inset-0 h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat md:bg-[url('/path-to-your-desktop-bg.png')] bg-[url('/path-to-your-mobile-bg.png')]">
      
      {/* --- 3. ส่วน Background: สลับรูปตาม windowWidth --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ 
          backgroundImage: `url(${windowWidth >= 768 ? bgDesktop : bgMobile})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center' 
        }}
      />

      {/* แก้ไขจุดที่ 2: ลบ mt-0 -translate-y-55 md:-translate-y-43.5 ออก เพื่อให้การ์ดอยู่กึ่งกลางอย่างเสถียรด้วย Flexbox ของตัวแม่ */}
      <div className="scale-85 md:scale-75 relative z-10 bg-[#7b74c4]/60 backdrop-blur-md w-full max-w-[540px] md:max-w-[648px] min-h-[600px] md:min-h-[709px] rounded-[40px] shadow-2xl p-8 md:p-10 text-center border border-white/20 mx-6 transform mx-auto">
        <div className="mb-6 md:mb-8 flex justify-center">
          <img 
            src={logoLogin} 
            alt="Logo" 
            className="w-[75%] md:w-[85%] h-auto object-contain" 
          />
        </div>
        
        <div className="space-y-4 text-left">
          <label className="block text-white !text-xl !md:text-2xl font-medium mb-1 pl-4 opacity-90">
            Enter your email
          </label>
          
          <div className={`relative transition-all duration-300 ${errors.email ? 'pb-5' : 'pb-0'}`}>
            <input
              type="email"
              placeholder="Enter your email address"
              className={`w-full px-6 py-3 md:py-3.5 rounded-full bg-[#a9a4e4] placeholder-white/80 text-white border-2 outline-none focus:ring-4 focus:ring-white/50 text-sm shadow-lg ${errors.email ? 'border-red-500' : 'border-white'}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
            />
            {errors.email && <p className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-20 px-3 py-0 text-[14px] font-bold text-red-600 bg-white rounded-md border border-red-200 shadow-sm transition-all duration-300 mt-0 translate-y-0.75 md:translate-y-0.5 whitespace-nowrap leading-tight ">{errors.email}</p>}
          </div>
          
          <div className={`relative transition-all duration-300 ${errors.password ? 'pb-5' : 'pb-0'}`}>
            <input
              type="password"
              placeholder="Enter your password"
              className={`w-full px-6 py-3 md:py-3.5 rounded-full bg-[#a9a4e4] placeholder-white/80 text-white border-2 outline-none focus:ring-4 focus:ring-white/50 text-sm shadow-lg ${errors.password ? 'border-red-500' : 'border-white'}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
            />
            {errors.password && <p className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-20 px-3 py-0 text-[14px] font-bold text-red-600 bg-white rounded-md border border-red-200 shadow-sm transition-all duration-300 mt-0 translate-y-0.75 md:translate-y-0.5 whitespace-nowrap leading-tight ">{errors.password}</p>}
          </div>
        </div>

        <button 
          onClick={handleLogin}
          className="w-full py-5 mt-4 bg-[#1e1a3d] hover:bg-[#2d2859] hover:brightness-150 text-white text-xl font-bold rounded-full shadow-xl transition-all active:scale-95"
        >
          Login
        </button>

        <div className="mt-6 text-xs md:text-sm text-white/90 space-y-2">
          <p className="cursor-pointer hover:underline" 
  onClick={() => navigate('/forgot-password')}>forgot your password?</p>
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

      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#7b74c4] border border-white/20 p-8 rounded-[32px] w-full max-w-[400px] text-center shadow-2xl mx-4 transform scale-100 transition-all duration-300">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 text-green-400 mb-6 border border-green-500/30">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 -translate-y-5 md:-translate-y-5">
              Welcome back!
            </h3>
            <p className="text-white/80 text-sm mb-6 -translate-y-4.5 md:-translate-y-5">
              Login Successful.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                window.location.href = '/';
              }}
              className="w-full py-3 bg-[#1e1a3d] hover:bg-[#2d2859] hover:brightness-120 text-white font-bold rounded-full shadow-lg transition-all active:scale-95 text-base"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default LoginPage;