import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  
  // กำหนดหน้าที่ "ไม่ต้องการ" ให้แสดง Navbar (เช่น หน้า Login/Register ถ้าอยากให้เป็น Full Screen)
  // แต่ถ้าต้องการให้แสดงทุกหน้า ก็สามารถลบเงื่อนไขนี้ออกได้ครับ
  const hideNavbarPaths = ['/login', '/register'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {showNavbar && (
        <nav className="bg-black/90 text-white p-4 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo ตามดีไซน์ */}
            <div className="text-xl font-bold tracking-wider">
              Creative <span className="font-light">Market</span>
            </div>

            {/* Main Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="hover:text-gray-300 transition">Home</Link>
              <Link to="/about" className="hover:text-gray-300 transition">About Us</Link>
              <Link to="/category" className="hover:text-gray-300 transition">Category</Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="bg-white text-black px-6 py-1 rounded hover:bg-gray-200 transition text-sm font-medium"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="border border-white px-6 py-1 rounded hover:bg-white hover:text-black transition text-sm font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
      )}

      {/* เนื้อหาของแต่ละ Page จะมาแสดงตรงนี้ */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;