import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { logout } from '../reducer/authSlice'; 
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    navigate('/login');
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/Products', label: 'Products' },
    { path: '/Card', label: 'Cart' },
    { path: '/About', label: 'About' }
  ];

  return (
    <>
      {/* Main navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 w-full flex justify-center">
        <div className="hidden md:flex items-center justify-center space-x-20 px-20 pt-1 pb-2 backdrop-blur-md rounded-full shadow-lg">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${isActive ? 'text-orange-600' : 'text-black'} font-semibold hover:text-orange-600 transition`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-black font-semibold hover:text-orange-600 transition cursor-pointer"
          >
            <LuLogOut />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden absolute top-0 right-6 flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black hover:text-orange-600 transition"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`absolute top-16 right-6 bg-white p-5 rounded-xl shadow-xl flex flex-col space-y-4 md:hidden z-50 transition-all duration-300 ease-out ${
            menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${isActive ? 'text-orange-600' : 'text-black'} font-semibold hover:text-orange-600 transition`
              }
            >
              {label}
            </NavLink>
          ))}
          {/* Logout mobile */}
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="text-black font-semibold hover:text-orange-600 transition cursor-pointer text-left"
          >
            Logout
          </button>
        </div>
      </div>

      {/*  Logout Confirmation Modal */}

{/* Logout Confirmation Modal */}
{showLogoutConfirm && (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none animate-in fade-in duration-200"
    style={{
      animation: 'fadeIn 0.2s ease-out'
    }}
  >
    {/* Backdrop with blur effect */}
    <div 
      className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
      style={{
        animation: 'backdropFadeIn 0.3s ease-out'
      }}
      onClick={cancelLogout}
    ></div>
    
    {/* Modal Content */}
    <div 
      className="bg-amber-50 p-8 rounded-xl shadow-xl w-110 text-center space-y-4 pointer-events-auto relative transform"
      style={{
        animation: 'modalSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {/* Warning Icon with pulse animation */}
      <div className="flex justify-center mb-2">
        <div 
          className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center"
          style={{
            animation: 'iconPulse 2s infinite'
          }}
        >
          <svg 
            className="w-6 h-6 text-orange-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
      </div>
      
      <h2 
        className="text-xl font-semibold text-gray-800"
        style={{
          animation: 'slideDown 0.4s ease-out 0.1s both'
        }}
      >
        Confirm Logout
      </h2>
      
      <p 
        className="text-sm text-gray-600"
        style={{
          animation: 'slideDown 0.4s ease-out 0.2s both'
        }}
      >
        Are you sure you want to log out?
      </p>
      
      <div 
        className="flex justify-center gap-4 pt-4"
        style={{
          animation: 'slideUp 0.4s ease-out 0.3s both'
        }}
      >
        <button
          onClick={confirmLogout}
          className="px-6 py-2 bg-orange-600 cursor-pointer text-white rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95 font-medium"
        >
          Yes, Logout
        </button>
        <button
          onClick={cancelLogout}
          className="px-6 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 hover:shadow-md active:scale-95 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

<style jsx>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes backdropFadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(4px);
    }
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes iconPulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }
`}</style>

    </>
  );
};

export default Navbar;
