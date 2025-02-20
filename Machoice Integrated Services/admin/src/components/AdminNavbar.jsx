import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Transition } from '@headlessui/react';
import { assets } from '../assets/asset';

const Navbar = ({ links = [], onLogout, isAdmin = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-br from-[#F5E8DF] to-[#E9D8C7] py-2 shadow-xl w-full z-50">
      <div className="px-2 sm:px-6 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to={isAdmin ? "/admin" : "/"} className="flex items-center">
              <img src={assets.logo} alt="Logo" className="h-20 w-auto" />
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {isAdmin && onLogout && (
              <button
                onClick={onLogout}
                className="hidden md:flex items-center space-x-2 text-[#6A3917] hover:text-[#5A2F13]"
              >
                <LogOut className="w-6 h-6" />
                <span>Logout</span>
              </button>
            )}
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
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="ml-8 block mobile-nav-link text-[#6A3917] hover:text-[#5A2F13]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && onLogout && (
              <div className="pt-4 border-t">
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="ml-8 flex items-center space-x-2 text-[#6A3917] hover:text-[#5A2F13]"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;