import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  PlusCircle,
  List,
  ShoppingCart,
  CheckCircle,
  Palette,
  X,
  Tag,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserPlus,
  XCircle, // Added for "Canceled Orders"
} from 'lucide-react';
import AdminNavbar from './AdminNavbar';
import { assets } from '../assets/asset';

const AdminLayout = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  // Common icon props
  const iconProps = {
    stroke: "#6A3917",
    strokeWidth: 2,
    fill: "none",
    style: { width: '19px' },
  };

  const sidebarItems = [
    { name: 'Add Product', icon: <PlusCircle {...iconProps} />, path: '/add-product' },
    { name: 'List of Products', icon: <List {...iconProps} />, path: '/products' },
    { name: 'Orders', icon: <ShoppingCart {...iconProps} />, path: '/orders' },
    { name: 'Completed Orders', icon: <CheckCircle {...iconProps} />, path: '/completed-orders' },
    { name: 'Canceled Orders', icon: <XCircle {...iconProps} />, path: '/canceled-orders' }, // Added here
    { name: 'Branding', icon: <Palette {...iconProps} />, path: '/branding' },
    { name: 'Coupons', icon: <Tag {...iconProps} />, path: '/coupons' },
  ];

  const adminLinks = [
    { to: '/add-product', label: 'Add Product' },
    { to: '/products', label: 'List of Products' },
    { to: '/orders', label: 'Orders' },
    { to: '/completed-orders', label: 'Completed Orders' },
    { to: '/canceled-orders', label: 'Canceled Orders' }, // Added here
    { to: '/branding', label: 'Branding' },
    { to: '/coupons', label: 'Coupons' },
  ];

  return (
    <div className="min-h-screen bg-[#F5E8DF]">
      {/* Mobile Navbar: Only render on mobile/sm screens */}
      {isMobile && (
        <AdminNavbar links={adminLinks} onLogout={onLogout} isAdmin={true} />
      )}

      {/* Desktop Sidebar: Hidden on mobile and sm; visible on md+ */}
      <div
        className={`hidden md:block fixed h-screen bg-white shadow-xl transition-all duration-100 z-50 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/admin" className="flex items-center gap-2 overflow-hidden">
              {isSidebarOpen && (
                <>
                  <img
                    src={assets.logo}
                    alt="Logo"
                    className="transition-all duration-300 h-12"
                  />
                  <h2 className="font-bold text-[#6A3917] transition-all duration-300 ml-2">
                    Admin Panel
                  </h2>
                </>
              )}
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-[#6A3917] hover:bg-[#E9D8C7] p-1 rounded-lg"
            >
              {isSidebarOpen ? (
                <ChevronLeft style={{ width: 24, height: 24 }} />
              ) : (
                <ChevronRight style={{ width: 24, height: 24 }} />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="group relative flex items-center p-2 rounded-lg hover:bg-[#E9D8C7] transition text-[#6A3917]"
              >
                {/* Icon */}
                <div className="inline-block">{item.icon}</div>

                {/* Display text label inline if sidebar is open */}
                {isSidebarOpen ? (
                  <span className="ml-3 text-sm">{item.name}</span>
                ) : (
                  // Tooltip on hover when sidebar is closed
                  <span
                    className="absolute left-full ml-4 px-2 py-1 bg-white text-sm rounded shadow-lg
                               opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                  >
                    {item.name}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Create New Admin Button */}
          <Link
            to="/create-admin"
            className="group relative flex items-center p-2 rounded-lg mt-4 hover:bg-[#E9D8C7] transition text-[#6A3917]"
          >
            <div className="inline-block">
              <UserPlus {...iconProps} />
            </div>
            {isSidebarOpen ? (
              <span className="ml-3 text-sm">Create Admin</span>
            ) : (
              <span
                className="absolute left-full ml-4 px-2 py-1 bg-white text-sm rounded shadow-lg
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              >
                Create Admin
              </span>
            )}
          </Link>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="group relative flex items-center p-2 rounded-lg hover:bg-[#E9D8C7] transition text-[#6A3917]"
          >
            <div className="inline-block">
              <LogOut {...iconProps} />
            </div>
            {isSidebarOpen ? (
              <span className="ml-3">Logout</span>
            ) : (
              <span
                className="absolute left-full ml-4 px-2 py-1 bg-white text-sm rounded shadow-lg
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              >
                Logout
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content with a little margin */}
      <main
        className={`pt-4 transition-all duration-300 ${
          isMobile
            ? 'px-4'
            : isSidebarOpen
            ? 'md:ml-64 md:pl-4'
            : 'md:ml-20 md:pl-4'
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;