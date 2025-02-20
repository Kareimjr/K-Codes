import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; // Add Outlet
import AdminNavbar from './AdminNavbar';
import { PlusCircle, List, ShoppingCart, CheckCircle, Palette, X, Tag } from 'lucide-react';

const adminLinks = [
  { to: '/add-product', label: 'Add Product' },
  { to: '/products', label: 'List of Products' },
  { to: '/orders', label: 'Orders' },
  { to: '/completed-orders', label: 'Completed Orders' },
  { to: '/branding', label: 'Branding' },
  { to: '/coupons', label: 'Coupons' },
];

const AdminLayout = ({ onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarItems = [
    { name: 'Add Product', icon: <PlusCircle className="w-6 h-6" />, path: '/add-product' },
    { name: 'List of Products', icon: <List className="w-6 h-6" />, path: '/products' },
    { name: 'Orders', icon: <ShoppingCart className="w-6 h-6" />, path: '/orders' },
    { name: 'Completed Orders', icon: <CheckCircle className="w-6 h-6" />, path: '/completed-orders' },
    { name: 'Branding', icon: <Palette className="w-6 h-6" />, path: '/branding' },
    { name: 'Coupons', icon: <Tag className="w-6 h-6" />, path: '/coupons' },
  ];

  return (
    <div className="min-h-screen bg-[#F5E8DF]">
      <AdminNavbar links={adminLinks} onLogout={onLogout} isAdmin={true} />
      <div className="flex">
        {/* Sidebar for larger screens */}
        <div className="hidden md:block w-64 bg-white shadow-xl h-[calc(100vh-4rem)] fixed">
          <nav className="p-4 space-y-4">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center gap-3 text-[#6A3917] hover:bg-[#E9D8C7] p-2 rounded-lg transition"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 p-8 md:ml-64">
          <Outlet /> {/* Replace {children} with Outlet */}
        </main>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50">
            <div className="p-4 space-y-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-[#6A3917]"
              >
                <X className="w-8 h-8" />
              </button>
              <nav className="mt-16 space-y-4">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-[#6A3917] hover:bg-[#E9D8C7] p-2 rounded-lg transition"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLayout;