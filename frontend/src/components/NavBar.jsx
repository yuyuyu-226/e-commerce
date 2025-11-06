// src/components/NavBar.jsx

import React, { useState } from 'react';
import { Home, ShoppingBag, Mail, Info, LogIn, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Array of navigation links for easy mapping
const navLinks = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Products', icon: ShoppingBag, path: '/products' },
  { name: 'Contact', icon: Mail, path: '/contact' },
  { name: 'About', icon: Info, path: '/about' },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Common Tailwind classes based on your original CSS
  const navBarClass = "flex items-center justify-between p-4 bg-gray-200 shadow-xl w-full sticky top-0 z-50 rounded-b-lg";
  const brandClass = "text-xl font-extrabold text-gray-900 mr-8 tracking-wider";
  
  const linkBaseClass = "flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150 p-2 rounded-lg";
  const iconClass = "w-4 h-4 mr-2";
  
  const loginButtonClass = "flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-150 cursor-pointer";
  const loginIconClass = "w-4 h-4 mr-2 transform rotate-180";


  return (
    <header className={navBarClass}>
      {/* Left Side: Brand Logo and Mobile Menu Button */}
      <div className="flex items-center">
        <Link to="/" className={brandClass}>
          MyBrand
        </Link>
        {/* Hamburger Menu Button (visible on mobile) */}
        <button 
          className="md:hidden p-2 text-gray-700 hover:bg-gray-300 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Center: Desktop Navigation Links (hidden on mobile) */}
      <nav className="hidden md:flex flex-grow justify-center items-center space-x-4 lg:space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={linkBaseClass}
          >
            <link.icon className={iconClass} />
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Right Side: Login/Sign Up Button (always visible) */}
      <div className="ml-auto flex-shrink-0">
        <Link to="/login"> 
          <button className={loginButtonClass}>
            <LogIn className={loginIconClass} />
            Login / Sign Up
          </button>
        </Link>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      {isOpen && (
        <nav 
          id="mobile-menu"
          className="absolute inset-x-0 top-full bg-gray-100 shadow-xl md:hidden flex flex-col items-start p-4 space-y-2 rounded-b-lg animate-fade-in"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${linkBaseClass} w-full text-lg`} // Larger text for mobile links
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              <link.icon className="w-5 h-5 mr-3" />
              {link.name}
            </Link>
          ))}
        </nav>
      )}

      {/* Tailwind CSS keyframes for a smooth opening/closing effect */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default NavBar;