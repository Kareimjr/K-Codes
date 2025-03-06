import { BrandingContext } from "@/context/BrandingContext";
import { assets } from "@/assets/assets";
import { Copyright } from "lucide-react";
import { FaTwitter, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useContext } from "react";

function Footer() {
  const { brandingData } = useContext(BrandingContext);

  // While branding data is still loading, you might display a loader or fallback.
  // Here, we simply use the default logo if brandingData is not yet available.
  const footerLogo =
    brandingData?.footerLogo?.url || assets.footer_logo;

    console.log(brandingData, 'brandingData');
    

  return (
    <div>
      <footer className="mt-8 pb-8 sm:pb-4 sm:mt-4 px-6 sm:px-14 bg-[#2A3571]">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start py-6 gap-8 sm:gap-4">
          {/* Logo and description */}
          <div className="flex-1 sm:max-w-[240px]">
            <img
              src={footerLogo}
              alt="Footer Logo"
              className="w-28 sm:w-36"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex-1 text-sm sm:text-base sm:max-w-[200px]">
            <h5 className="text-white font-bold mb-4">Links</h5>
            <ul className="space-y-2">
              <Link to="/student/about-us" className="block text-gray-400 hover:text-gray-200">About Us</Link>
              <Link to="/student/courses" className="block text-gray-400 hover:text-gray-200">Explore Courses</Link>
              <Link to="/student/course/mycourses" className="block text-gray-400 hover:text-gray-200">My Courses</Link>
              <Link to="/student/contact-us" className="block text-gray-400 hover:text-gray-200">Contact Us</Link>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="flex-1 text-sm sm:text-base sm:max-w-[300px]">
            <h5 className="text-white font-bold mb-4">Subscribe</h5>
            <form className="grid grid-cols-[1fr_auto] gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 w-full rounded-md bg-gray-100 text-black"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-blue-500 text-white rounded-md whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {/* Social links */}
            <div className="mt-4">
              <div className="flex space-x-4 items-center">
                <a href="#" className="text-gray-200 hover:text-gray-400">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-200 hover:text-gray-400">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-gray-200 hover:text-gray-400">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-gray-200 hover:text-gray-400">
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex text-xs text-[#c7c7c7] justify-center items-center mt-2">
          <Copyright className="w-4 h-4 mr-3" />
          <p>{new Date().getFullYear()} MDI HUB. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
