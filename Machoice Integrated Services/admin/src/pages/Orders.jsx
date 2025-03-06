// src/pages/Orders.js
import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../services/services';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateOrderStatus(id, { newStatus });
      toast.success(res.data.message);
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data.message || 'Error updating order status');
    }
  };

  return (
    <div className="bg-white max-w-3xl mx-auto p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#6A3917]">Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-[#D7B9A5] rounded-lg p-4 bg-[#F5E8DF] shadow-sm relative"
          >
            <div className="flex-shrink-0 mb-4">
              <span className="text-2xl text-[#A67C52]">📦</span>
            </div>
            <div className="flex-1">
              <p className="text-[#6A3917] font-medium">
                {order.items.map((item) => `${item.productName} x ${item.quantity}`).join(', ')}
              </p>
              <p className="text-sm text-[#6A3917]">
                {order.customerName}
                <br />
                {order.address}
                <br />
                Phone: {order.phone}
                <br />
                Date: {order.date}
                <br />
                Order ID: {order._id}
                <br />
                Payment: {order.paymentMethod === 'online' ? `Online (${order.paymentStatus})` : 'COD'}
              </p>
            </div>
            <div className="text-right flex-shrink-0 space-y-1 mt-4 md:mt-2">
              <p className="text-sm text-[#6A3917]">Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <p className="text-lg font-bold text-[#6A3917]">₦ {order.total.toLocaleString()}</p>
            </div>
            <div className="absolute top-3 right-3 flex-shrink-0">
              <select
                value={order.orderStatus}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="p-1 border border-[#A67C52] rounded bg-white focus:outline-none focus:border-[#6A3917]"
              >
                <option value="processing">Order Processing</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;