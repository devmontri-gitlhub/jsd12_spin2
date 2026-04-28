import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';

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

export default App;