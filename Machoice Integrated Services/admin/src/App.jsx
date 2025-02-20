import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import AddProduct from './pages/AddProduct';
import ListOfProducts from './pages/ListOfProducts';
import Orders from './pages/Orders';
import CompletedOrders from './pages/CompletedOrders';
import Branding from './pages/Branding';
import Coupons from './pages/Coupons';

const App = () => {
  const handleLogout = () => {
    console.log('Logout');
    // Implement logout logic (e.g., clear auth token, redirect)
  };

  return (
    <Routes>
      <Route path="/" element={<AdminLayout onLogout={handleLogout} />}>
        {/* Nested routes */}
        <Route path="add-product" element={<AddProduct />} />
        <Route path="products" element={<ListOfProducts />} />
        <Route path="orders" element={<Orders />} />
        <Route path="completed-orders" element={<CompletedOrders />} />
        <Route path="branding" element={<Branding />} />
        <Route path="coupons" element={<Coupons />} />
        {/* Optional: Add a default route for the admin dashboard */}
        <Route index element={<div className='text-2xl text-[#6A3917] md:text-3xl font-extrabold'>Welcome to Admin Panel</div>} />
      </Route>
      {/* Add other top-level routes here if needed */}
    </Routes>
  );
};

export default App;