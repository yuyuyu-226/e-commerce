import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a202c] text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: Branding & Copyright */}
          <div className="flex flex-col justify-between h-full space-y-6 md:space-y-0">
            <div>
              <p className="text-gray-200 text-sm leading-relaxed max-w-xs">
                Dedicated to crafting quality apparel with innovation and integrity.
              </p>
            </div>
            
            {/* Copyright Text */}
            <div className="text-gray-400 text-sm font-medium mt-auto">
              &copy; 2025 Manufacture and Produce. All rights reserved.
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-6 text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-300 font-medium">
              <li>
                <Link to="/products" className="hover:text-white hover:underline transition-all duration-200">
                  Product Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-all duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-all duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Socials */}
          <div>
            <h3 className="text-base font-bold mb-6 text-white uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-300 font-medium mb-6">
              <p>123 Industrial Way, Textile City, TX 12345</p>
              <p>Email: <a href="mailto:info@fabricateandstyle.com" className="hover:text-white">info@manufactureandproduce.ph</a></p>
              <p>Phone: <a href="tel:+63281234567" className="hover:text-white">+63 (2) 8123 4567</a></p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;