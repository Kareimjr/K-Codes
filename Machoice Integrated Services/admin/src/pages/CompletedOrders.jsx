// src/pages/CompletedOrders.js
import React, { useState, useEffect } from 'react';
import { getCompletedOrders } from '../services/services';

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getCompletedOrders();
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.date.toLowerCase().includes(searchDate.toLowerCase())
  );

  return (
    <div className="bg-white max-w-3xl mx-auto p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#6A3917]">Completed Orders</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by date (e.g., 2023-10-02)"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
        />
      </div>
      <div className="space-y-4">
        {filteredOrders.map((order) => (
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
                Payment: {order.paymentMethod === 'online' ? 'Online' : 'COD'}
              </p>
            </div>
            <div className="text-right flex-shrink-0 space-y-1 mt-4 md:mt-2">
              <p className="text-sm text-[#6A3917]">Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <p className="text-lg font-bold text-[#6A3917]">₦{order.total.toLocaleString()}</p>
            </div>
            <div className="absolute top-3 right-3 flex-shrink-0">
              <select
                value={order.orderStatus}
                disabled
                className="p-1 border border-[#A67C52] rounded bg-white text-[#6A3917] cursor-not-allowed"
              >
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedOrders;
