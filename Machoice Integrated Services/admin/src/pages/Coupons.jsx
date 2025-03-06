// src/admin/pages/Coupons.js
import React, { useState, useEffect } from 'react';
import { Trash2, Edit } from 'lucide-react';
import { getCoupons, createCoupon, deleteCoupon, updateCoupon } from '../services/services';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({ title: '', discount: '', usageLimit: '', expiration: '' });
  const [editCoupon, setEditCoupon] = useState(null); // State for editing a coupon

  const fetchCoupons = async () => {
    try {
      const res = await getCoupons();
      setCoupons(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const res = await createCoupon(newCoupon);
      toast.success(res.data.message);
      setNewCoupon({ title: '', discount: '', usageLimit: '', expiration: '' });
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data.message || 'Error creating coupon');
    }
  };

  const handleEditCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCoupon(editCoupon._id, editCoupon);
      toast.success(res.data.message);
      setEditCoupon(null); // Clear edit form after submission
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data.message || 'Error updating coupon');
    }
  };

  const handleDeleteCoupon = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this coupon?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      width: "300px",
    });
    if (!result.isConfirmed) return;
    try {
      const res = await deleteCoupon(id);
      toast.success(res.data.message);
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data.message || 'Error deleting coupon');
    }
  };

  const handleEditCoupon = (coupon) => {
    setEditCoupon({
      _id: coupon._id,
      title: coupon.title,
      discount: coupon.discount,
      usageLimit: coupon.usageLimit,
      expiration: new Date(coupon.expiration).toISOString().substring(0, 10),
    });
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
            className="p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            required
          />
          <input
            type="number"
            placeholder="Discount Percentage"
            value={newCoupon.discount}
            onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
            className="p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            required
          />
          <input
            type="number"
            placeholder="Usage Limit"
            value={newCoupon.usageLimit}
            onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
            className="p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            required
          />
          <input
            type="date"
            value={newCoupon.expiration}
            onChange={(e) => setNewCoupon({ ...newCoupon, expiration: e.target.value })}
            className="p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white py-2 px-4 rounded-lg hover:from-[#5A2F13] hover:to-[#935F3B] transition"
        >
          Add Coupon
        </button>
      </form>

      {/* Edit Coupon Form */}
      {editCoupon && (
        <form onSubmit={handleEditCouponSubmit} className="mb-6 space-y-4">
          <h3 className="text-lg font-bold text-[#6A3917]">Edit Coupon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Coupon Title"
              value={editCoupon.title}
              onChange={(e) => setEditCoupon({ ...editCoupon, title: e.target.value })}
              className="p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
              required
            />
            <input
              type="number"
              placeholder="Discount Percentage"
              value={editCoupon.discount}
              onChange={(e) => setEditCoupon({ ...editCoupon, discount: e.target.value })}
              className="p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
              required
            />
            <input
              type="number"
              placeholder="Usage Limit"
              value={editCoupon.usageLimit}
              onChange={(e) => setEditCoupon({ ...editCoupon, usageLimit: e.target.value })}
              className="p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
              required
            />
            <input
              type="date"
              value={editCoupon.expiration}
              onChange={(e) => setEditCoupon({ ...editCoupon, expiration: e.target.value })}
              className="p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white py-2 px-4 rounded-lg hover:from-[#5A2F13] hover:to-[#935F3B] transition"
            >
              Update Coupon
            </button>
            <button
              type="button"
              onClick={() => setEditCoupon(null)}
              className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Coupon List */}
      <div className="space-y-4">
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="border border-[#D7B9A5] rounded-lg p-4 bg-[#F5E8DF] shadow-sm relative flex"
          >
            <div className="flex-shrink-0 mr-4">
              <span className="text-3xl text-[#A67C52]">🎁</span>
            </div>
            <div>
              <p className="text-[#6A3917] font-medium">{coupon.title} - {coupon.discount}% Off</p>
              <p className="text-sm text-[#6A3917]">
                Usage: {coupon.usageCount}/{coupon.usageLimit}<br />
                Expires: {new Date(coupon.expiration).toLocaleDateString()}
              </p>
            </div>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => handleEditCoupon(coupon)}
                className="text-[#6A3917] hover:text-[#5A2F13] p-2"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteCoupon(coupon._id)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;