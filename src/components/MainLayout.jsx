import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // ดึงข้อมูล User จาก Storage
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (e) {
        console.error("Error parsing user data");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.href = '/login'; // เคลียร์สถานะด้วยการรีโหลดไปหน้า login
  };

  // แก้ไขจุดนี้: เพิ่ม '/forgot-password' และ '/reset-password' เข้าไปใน Array เพื่อสั่งซ่อนแถบเมนู Navbar
  const hideNavbarPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {showNavbar && (
        <nav className="bg-black/90 text-white p-4 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">
              Creative <span className="font-light">Market</span>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/category" className="hover:text-gray-300">Category</Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* ใช้เครื่องหมาย ? หลัง currentUser เพื่อป้องกัน Error หน้าจอขาว */}
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-gray-400 leading-none">Logged in as</p>
                    <p className="text-sm font-medium text-purple-300">{currentUser?.email}</p>
                  </div>
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border border-white/20">
                    <span className="text-sm font-bold uppercase">{currentUser?.email?.charAt(0)}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-xs bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-2 py-1 rounded border border-red-500/50 transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link to="/login" className="bg-white text-black px-4 py-1 rounded text-sm font-medium">Login</Link>
                  <Link to="/register" className="border border-white px-4 py-1 rounded text-sm font-medium">Register</Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;