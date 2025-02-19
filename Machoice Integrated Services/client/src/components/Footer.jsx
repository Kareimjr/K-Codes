// src/components/Footer.js
import React from 'react';
import { assets } from '../assets/asset';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#F5E8DF] to-[#E9D8C7] text-gray-800 py-5 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src={assets.logo} alt="Logo" className="h-20 w-auto mb-1" />
            <p className="text-gray-800">Leading manufacturer of eco-friendly cleaning solutions</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#6A3917]">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/products" className="hover:text-[#6A3917] transition">Products</a></li>
              <li><a href="/about" className="hover:text-[#6A3917] transition">About Us</a></li>
              <li><a href="/services" className="hover:text-[#6A3917] transition">Services</a></li>
              <li><a href="/contact" className="hover:text-[#6A3917] transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#6A3917]">Contact Info</h4>
            <ul className="text-gray-800 space-y-2">
              <li>📞 +234 000 000 000</li>
              <li>📧 info@machoice.com</li>
              <li>📍 Ibeju-Lekki, Lagos</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#6A3917]">Newsletter</h4>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6A3917] focus:border-transparent transition"
              />
              <button 
                className="bg-gradient-to-r from-[#6A3917] to-[#A67C52] hover:from-[#5A2F13] hover:to-[#935F3B] text-white py-3 px-4 rounded-lg font-medium transition-all cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Machoice Nigeria. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-2">
            <a href="#" className="hover:text-[#6A3917] transition">Privacy Policy</a>
            <a href="#" className="hover:text-[#6A3917] transition">Terms of Service</a>
            <a href="#" className="hover:text-[#6A3917] transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;