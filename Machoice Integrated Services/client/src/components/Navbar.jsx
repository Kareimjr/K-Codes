// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, ShoppingBasketIcon } from 'lucide-react';
import { Transition } from '@headlessui/react';
import { useCart } from '../context/CartContext';
import { assets } from '../assets/asset';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-br from-[#F5E8DF] to-[#E9D8C7] py-2 shadow-xl w-full z-50">
      <div className="px-2 sm:px-6 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-32">
            <Link to="/" className="flex items-center">
              <img src={assets.logo} alt="Logo" className="h-16 w-auto" />
            </Link>

            <div className="hidden md:flex space-x-6 font-semibold">
              <Link
                to="/"
                className="nav-link border-b-2 border-transparent hover:border-[#6A3917] text-[#6A3917] hover:text-[#5A2F13]"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="nav-link border-b-2 border-transparent hover:border-[#6A3917] text-[#6A3917] hover:text-[#5A2F13]"
              >
                About Us
              </Link>
              <Link
                to="/services"
                className="nav-link border-b-2 border-transparent hover:border-[#6A3917] text-[#6A3917] hover:text-[#5A2F13]"
              >
                Services
              </Link>
              <Link
                to="/products"
                className="nav-link border-b-2 border-transparent hover:border-[#6A3917] text-[#6A3917] hover:text-[#5A2F13]"
              >
                Products
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative">
              <ShoppingBasketIcon className="w-7 h-7 text-[#6A3917] hover:text-[#5A2F13] transition" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#6A3917] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link to="/login" className="hidden md:flex items-center space-x-2">
              <User className="w-6 h-6 text-[#6A3917] hover:text-[#5A2F13]" />
            </Link>
            <button onClick={toggleMobileMenu} className="md:hidden text-[#6A3917]">
              {mobileMenuOpen ? (
                <X className="w-7 h-7 cursor-pointer" />
              ) : (
                <Menu className="w-7 h-7 cursor-pointer" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Transition */}
      <Transition
        show={mobileMenuOpen}
        enter="transition-opacity duration-600 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-400 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="md:hidden bg-gradient-to-br from-[#F5E8DF] to-[#E9D8C7] mt-2 border-t">
          <div className="py-5 space-y-4 font-semibold">
            <Link
              to="/"
              className="ml-8 block mobile-nav-link text-[#6A3917] hover:text-[#5A2F13]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="ml-8 block mobile-nav-link text-[#6A3917] hover:text-[#5A2F13]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="ml-8 block mobile-nav-link text-[#6A3917] hover:text-[#5A2F13]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/products"
              className="ml-8 block mobile-nav-link text-[#6A3917] hover:text-[#5A2F13]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <div className="pt-4 border-t">
              <Link
                to="/login"
                className="ml-8 flex items-center space-x-2 text-[#6A3917] hover:text-[#5A2F13]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>My Account</span>
              </Link>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;