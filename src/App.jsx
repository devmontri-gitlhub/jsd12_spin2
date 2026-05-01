/* ---Start : Import Modules --- */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/* ---Start : Import Components and Pages --- */
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/* ---Start : การใช้งาน Router --- */
/* 1 MainLayout จะเป็น Layout หลักของเว็บไซต์ โดยจะมี Outlet สำหรับแสดงเนื้อหาของแต่ละหน้า
   2 Home, About, Register, LoginPage จะเป็นหน้าเนื้อหาที่จะแสดงใน MainLayout ตามเส้นทางที่กำหนด */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LoginPage />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}
///////////////////////////////////////////////////
//////////////////////////////////////////////////
/* ---Start : Export App Component --- */
export default App;
///////////////////////////////////////////////////
///////////////////////////////////////////////////
