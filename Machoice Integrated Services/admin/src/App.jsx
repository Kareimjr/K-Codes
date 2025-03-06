// src/App.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import AddProduct from './pages/AddProduct';
import ListOfProducts from './pages/ListOfProducts';
import Orders from './pages/Orders';
import CompletedOrders from './pages/CompletedOrders';
import Branding from './pages/Branding';
import Coupons from './pages/Coupons';
import AdminLogin from './pages/AdminLogin';
import AdminResetPassword from './pages/ResetPassword';
import CanceledOrders from './pages/CanceledOrder';
import { AuthContext } from './contexts/AuthContext';
import NotFound from './pages/404';
import Team from './pages/Team';
import { assets } from './assets/asset';

const App = () => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* If already authenticated, redirect away from /auth */}
      <Route path="/auth" element={ auth ? <Navigate to="/" replace /> : <AdminLogin /> } />
      <Route path="/reset-password" element={<AdminResetPassword />} />
      <Route path="/" element={auth ? <AdminLayout /> : <Navigate to="/auth" replace />}>
        <Route path="add-product" element={<AddProduct />} />
        <Route path="products" element={<ListOfProducts />} />
        <Route path="orders" element={<Orders />} />
        <Route path="completed-orders" element={<CompletedOrders />} />
        <Route path="canceled-orders" element={<CanceledOrders />} />
        <Route path="branding" element={<Branding />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="team" element={<Team />} />
        <Route
          index
          element={
            <div className="max-h-screen mt-[25vh] flex items-center justify-center">
              <div className="flex flex-col items-center text-2xl text-[#6A3917] md:text-3xl font-extrabold">
                <img src={assets.logo} className="w-32 h-auto mb-5" alt="Logo" />
                Welcome to Admin Panel
              </div>
            </div>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;