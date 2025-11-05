// src/components/NavBar.jsx

import React from 'react';
import { Home, ShoppingBag, Mail, Info, LogIn } from 'lucide-react';
// Import the custom CSS file
import './NavBar.css'; 
import { Link } from 'react-router-dom'; // Using Link for proper React routing

// Array of navigation links for easy mapping
const navLinks = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Products', icon: ShoppingBag, path: '/products' },
  { name: 'Contact', icon: Mail, path: '/contact' },
  { name: 'About', icon: Info, path: '/about' },
];

const NavBar = () => {
  return (
    // Use the custom 'navbar' class
    <header className="navbar">
      {/* Left Side: Brand Logo */}
      <div className="navbar-brand">
        MyBrand
      </div>

      {/* Center: Navigation Links */}
      <nav className="navbar-links">
        {navLinks.map((link) => (
          // Use Link component for client-side navigation
          // Use the custom 'nav-link' class
          <Link
            key={link.name}
            to={link.path}
            className="nav-link"
          >
            {/* Icon Component */}
            <link.icon className="nav-icon" />
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Right Side: Login/Sign Up Button */}
      <div className="navbar-login">
        {/* Use the custom 'login-button' class */}
        <Link to="/signup" className="login-link"> 
          <button className="login-button">
            {/* Icon Component */}
            <LogIn className="login-icon" />
            Login / Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;