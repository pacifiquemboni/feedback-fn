import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import AuthModel from './modal/modal';
import Auth from './auth';

export default function Header() {
  const [isAuthModel, setAuthModel] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardLink, setDashboardLink] = useState('/dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const Googletoken = queryParams.get("token");

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token || Googletoken) {
      setIsLoggedIn(true);
    }

    if (user) {
      const userType = JSON.parse(user).type;
      if (userType === 'admin') {
        setDashboardLink('/admin-dashboard');
      } else if (userType === 'host') {
        setDashboardLink('/host-dashboard');
      } else {
        setDashboardLink('/renters-dashboard'); // Default dashboard
      }
    }
  }, []);

  const toggleAuthModel = () => {
    setAuthModel(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user data
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <header className="bg-white text-black p-1 h-20">
        <nav className="flex justify-between items-center lg:mx-12">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-20 h-20" />
            <h1 className="font-bold text-2xl">Feedback Board App</h1>
          </div>
          <ul className="flex space-x-4 items-center cursor-pointer">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <div className="">|</div>
            <li><Link to="/" className="hover:underline">About Us</Link></li>
            <div className="">|</div>
            <li><Link to="/" className="hover:underline">Contact Us</Link></li>
            <div className="">|</div>
            <li><Link to="/" className="hover:underline">Docs</Link></li>
            <div className="">|</div>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to={dashboardLink} className="hover:underline">Dashboard</Link>
                </li>
                <li className="border p-2 rounded-xl">
                  <div onClick={handleLogout} className="hover:underline">Logout</div>
                </li>
              </>
            ) : (
              <li className="border p-2 rounded-xl">
                <div onClick={toggleAuthModel} className="hover:underline">Get Started</div>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {isAuthModel && (
        <AuthModel onClose={() => setAuthModel(false)} children={<Auth />} />
      )}
    </>
  );
}
