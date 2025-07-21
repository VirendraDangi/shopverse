import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated) return null;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/Products', label: 'Products' },
    { path: '/Card', label: 'Cart' },
    { path: '/About', label: 'About' },
    { path: '/login', label: 'Login' }
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 w-full flex justify-center">
      {/* Desktop Navbar */}
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
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden absolute top-0 right-6 flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-black hover:text-orange-600 transition"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu with animation */}
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
      </div>
    </div>
  );
};

export default Navbar;
