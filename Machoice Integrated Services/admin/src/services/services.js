import axiosInstance from './axiosInstance';

// Auth
export const adminLogin = (data) => axiosInstance.post('/admin/auth/login', data);
export const adminSignup = (data) => axiosInstance.post('/admin/auth/signup', data);
export const adminLogout = () => axiosInstance.post('/admin/auth/logout');
export const sendOtp = (data) => axiosInstance.post('/admin/auth/send-otp', data);
export const verifyOtp = (data) => axiosInstance.post('/admin/auth/verify-otp', data);
export const resetPassword = (data) => axiosInstance.post('/admin/auth/reset-password', data);

// Products
export const addProduct = (data, config) => axiosInstance.post('/admin/products', data, config);
export const getProducts = () => axiosInstance.get('/admin/products');
export const updateProduct = (id, data, config) => axiosInstance.put(`/admin/products/${id}`, data, config);
export const deleteProduct = (id) => axiosInstance.delete(`/admin/products/${id}`);

// Orders
export const getOrders = () => axiosInstance.get('/admin/orders');
export const updateOrderStatus = (id, data) => axiosInstance.put(`/admin/orders/${id}/status`, data);
export const getCompletedOrders = () => axiosInstance.get('/admin/orders/completed');
export const getCanceledOrders = () => axiosInstance.get('/admin/orders/canceled');

// Branding
export const getBranding = () => axiosInstance.get('/admin/branding');
export const updateBranding = (data, config) => axiosInstance.post('/admin/branding', data, config);

// Coupons
export const createCoupon = (data) => axiosInstance.post('/admin/coupons', data);
export const getCoupons = () => axiosInstance.get('/admin/coupons');
export const deleteCoupon = (id) => axiosInstance.delete(`/admin/coupons/${id}`);
