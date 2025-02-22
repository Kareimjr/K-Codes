import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const initialCoupons = [
  { id: 1, title: 'SUMMER10', discount: 10, usageLimit: 100, usageCount: 0, expiration: '2023-12-31' },
];

const Coupons = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [newCoupon, setNewCoupon] = useState({ title: '', discount: '', usageLimit: '', usageCount: 0, expiration: '' });

  const handleAddCoupon = (e) => {
    e.preventDefault();
    const coupon = { ...newCoupon, id: Date.now(), usageCount: 0 }; // Temporary ID, replace with backend-generated ID
    setCoupons([...coupons, coupon]);
    setNewCoupon({ title: '', discount: '', usageLimit: '', usageCount: 0, expiration: '' });
    // Add your backend API call here to save the coupon
  };

  const handleDeleteCoupon = (id) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
    // Add your backend API call here to delete the coupon
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-[#6A3917]">Coupons</h2>

      {/* Add Coupon Form */}
      <form onSubmit={handleAddCoupon} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Coupon Title"
            value={newCoupon.title}
            onChange={(e) => setNewCoupon({ ...newCoupon, title: e.target.value })}
            className="p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917] text-xs md:text-sm"
            required
          />
          <input
            type="number"
            placeholder="Discount Percentage"
            value={newCoupon.discount}
            onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
            className="p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917] text-xs md:text-sm"
            required
          />
          <input
            type="number"
            placeholder="Usage Limit"
            value={newCoupon.usageLimit}
            onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
            className="p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917] text-xs md:text-sm"
            required
          />
          <input
            type="date"
            value={newCoupon.expiration}
            onChange={(e) => setNewCoupon({ ...newCoupon, expiration: e.target.value })}
            className="p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917] text-xs md:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white py-2 px-4 rounded-lg hover:from-[#5A2F13] hover:to-[#935F3B] transition text-xs md:text-sm"
        >
          Add Coupon
        </button>
      </form>

      {/* List of Coupons (Card-based) */}
      <div className="space-y-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="border border-[#D7B9A5] rounded-lg p-4 bg-[#F5E8DF] shadow-sm relative"
          >
            {/* Coupon Icon (Using a gift icon as a placeholder, similar to package) */}
            <div className="flex-shrink-0 mb-2">
              <span className="text-2xl text-[#A67C52]">🎁</span> {/* Placeholder for coupon/gift icon */}
            </div>

            {/* Coupon Details */}
            <div className="flex-1">
              <p className="text-[#6A3917] font-medium">
                {coupon.title} - {coupon.discount}% Off
              </p>
              <p className="text-sm text-[#6A3917]">
                Usage: {coupon.usageCount}/{coupon.usageLimit}
                <br />
                Expires: {new Date(coupon.expiration).toLocaleDateString()}
              </p>
            </div>

            {/* Actions (Delete Button) - Positioned at top right using absolute positioning */}
            <div className="absolute top-3 right-3 flex-shrink-0">
              <button
                onClick={() => handleDeleteCoupon(coupon.id)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;