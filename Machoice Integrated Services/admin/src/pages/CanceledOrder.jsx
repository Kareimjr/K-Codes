import React, { useState } from 'react';

const canceledOrders = [
  {
    id: 3,
    date: '2023-11-15 14:30',
    customerName: 'John Smith',
    address: '789 Pine St',
    phone: '08012345678',
    items: [{ productName: 'Product 3', quantity: 2 }],
    total: 3500,
    paymentMethod: 'online',
    orderStatus: 'canceled',
  },
];

const CanceledOrders = () => {
  const [searchDate, setSearchDate] = useState('');

  const filteredOrders = canceledOrders.filter((order) =>
    order.date.toLowerCase().includes(searchDate.toLowerCase())
  );

  return (
    <div className="bg-white max-w-3xl mx-auto p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#6A3917]">Canceled Orders</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by date (e.g., 2023-11-15)"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
        />
      </div>
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="border border-[#D7B9A5] rounded-lg p-4 bg-[#F5E8DF] shadow-sm relative"
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
                Payment: {order.paymentMethod === 'online' ? 'Online' : 'COD'}
              </p>
            </div>

            {/* Items Count and Total */}
            <div className="text-right flex-shrink-0 space-y-1 mt-4 md:mt-2">
              <p className="text-sm text-[#6A3917]">Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <p className="text-lg font-bold text-[#6A3917]">₦{order.total.toLocaleString()}</p>
            </div>

            {/* Status (Read-only) - Positioned at top right using absolute positioning */}
            <div className="absolute top-3 right-3 flex-shrink-0">
              <select
                value={order.orderStatus}
                disabled
                className="p-1 border border-[#A67C52] rounded bg-white text-[#6A3917] cursor-not-allowed"
              >
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanceledOrders;