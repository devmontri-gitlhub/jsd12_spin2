/*------------Start : Import From node_modules----------------------------------*/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // เพิ่มเข้ามาเพื่อใช้เปลี่ยนหน้า
/*-----------------------------------------------------------------------------------*/
/*------------Start : Import From SRC----------------------------------*/
import { authContent, mockUsers } from '../data/mockUsers';
import InputField from '../components/InputField';
import Button from '../components/Button';
/*----------------------------------------------*/

const LoginPage = () => {
  const navigate = useNavigate();
  
  /* -----------------Start : State Management------------------------- */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /* ------------------------------------------------------------------ */

  /* -----------------Start : Logic Functions------------------------- */
  const handleLogin = () => {
    // ตรวจสอบข้อมูลจาก mockUsers.js
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert(`Welcome back! Logged in as ${user.role}`);
      navigate('/'); // ล็อกอินสำเร็จให้ไปหน้า Home
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };
  /* ------------------------------------------------------------------ */

  /* -----------------Start : หัวใจ แห่ง JSX------------------------- */
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <div className="bg-[#8B89D4] w-full max-w-[450px] rounded-[50px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-12 text-center">
        <h1 className="text-white text-4xl font-extrabold mb-12 tracking-tighter italic italic-font">
          {authContent.loginTitle}
        </h1>
        
        <InputField 
          label="Enter your email"
          placeholder={authContent.placeholders.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <InputField 
          type="password"
          label="Enter your password"
          placeholder={authContent.placeholders.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleLogin}>Login</Button>

        <div className="mt-8 text-sm text-purple-100 space-y-2">
          <p className="cursor-pointer hover:text-white transition">forgot your password?</p>
          <p>
            Not have one ?{' '}
            <span 
              className="font-bold underline cursor-pointer hover:text-white"
              onClick={() => navigate('/register')} // คลิกแล้วไปหน้า Register
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