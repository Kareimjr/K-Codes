import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true // Add this to ensure credentials are sent with every request
});

axiosInstance.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, (err) => Promise.reject(err)); // Correct the Promise.reject to include the error

export default axiosInstance;