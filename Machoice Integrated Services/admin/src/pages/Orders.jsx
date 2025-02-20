import React, { useState } from 'react';

const initialOrders = [
  {
    id: 1,
    date: '2023-10-01 14:30',
    customerName: 'John Doe',
    address: '123 Main St',
    phone: '08012345678',
    items: [{ productName: 'Product A', quantity: 2 }, 
            { productName: 'Product B', quantity: 1 },
    ],
    total: 2000,
    paymentMethod: 'online',
    paymentStatus: 'success',
    orderStatus: 'processing',
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, orderStatus: newStatus } : order
    );
    setOrders(updatedOrders.filter((order) => order.orderStatus !== 'delivered'));
    console.log(`Order ${id} status updated to ${newStatus}`);
    // Update backend here
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#6A3917]">Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-[#D7B9A5] rounded-lg p-4 bg-[#F5E8DF] shadow-sm relative" // Added 'relative' for positioning context
          >
            {/* Package Icon */}
            <div className="flex-shrink-0 mb-4">
              <span className="text-2xl text-[#A67C52]">📦</span> {/* Placeholder for package icon */}
            </div>

            {/* Order Details */}
            <div className="flex-1">
              {/* Items */}
              <p className="text-[#6A3917] font-medium">
                {order.items
                  .map((item) => `${item.productName} x ${item.quantity}`)
                  .join(', ')}
              </p>

              {/* Customer, Address, Phone, Date, ID, Payment */}
              <p className="text-sm text-[#6A3917]">
                {order.customerName}
                <br />
                {order.address}
                <br />
                Phone: {order.phone}
                <br />
                Date: {order.date}
                <br />
                Order ID: {order.id}
                <br />
                Payment: {order.paymentMethod === 'online' 
                  ? `Online (${order.paymentStatus})` 
                  : 'COD'}
              </p>
            </div>

            {/* Items Count and Total */}
            <div className="text-right flex-shrink-0 space-y-1 mt-4 md:mt-2">
              <p className="text-sm text-[#6A3917]">Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <p className="text-lg font-bold text-[#6A3917]">₦ {order.total.toLocaleString()}</p>
            </div>

            {/* Status Dropdown - Positioned at top right using absolute positioning */}
            <div className="absolute top-3 right-3 flex-shrink-0">
              <select
                value={order.orderStatus}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
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