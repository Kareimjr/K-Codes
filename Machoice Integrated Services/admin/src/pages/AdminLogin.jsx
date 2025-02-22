// src/pages/AdminLogin.js
import React, { useState, useEffect } from 'react';

const AdminLogin = () => {
  // Initialize state from localStorage if available, otherwise use default values
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem('isLogin') ? JSON.parse(localStorage.getItem('isLogin')) : true;
  });
  const [email, setEmail] = useState(() => localStorage.getItem('email') || '');
  const [password, setPassword] = useState(() => localStorage.getItem('password') || '');
  const [name, setName] = useState(() => localStorage.getItem('name') || '');
  const [confirmPassword, setConfirmPassword] = useState(() => localStorage.getItem('confirmPassword') || '');

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isLogin', JSON.stringify(isLogin));
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('name', name);
    localStorage.setItem('confirmPassword', confirmPassword);
  }, [isLogin, email, password, name, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Admin login attempt:', { email, password });
    } else {
      console.log('Admin signup attempt:', { name, email, password, confirmPassword });
    }
    // Optionally clear sensitive fields after submission
    // setPassword('');
    // setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-[400px] w-full bg-white rounded-xl shadow-2xl p-6">
        <div className="text-center mb-3">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Admin Login' : 'Admin Signup'}
          </h2>
          <p className="text-gray-600 text-lg mt-2">
            {isLogin ? '' : 'Register a new admin account'}
          </p>
          {isLogin && (
            <p className="text-sm text-gray-500 mt-1">Authorized personnel only</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Admin Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="mt-1 h-10 w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3917]"
                required
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="mt-1 h-10 w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3917]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? 'Password' : 'Choose A Password'}
              className="mt-1 h-10 w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3917]"
              required
            />
          </div>

          {isLogin && (
            <p className="text-right text-sm">
              <a href="#" className="text-[#6A3917] hover:text-[#5A2F13] underline">
                Forgotten Password?
              </a>
            </p>
          )}

          {!isLogin && (
            <div>
              <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-Enter Password"
                className="mt-1 h-10 w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3917]"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="h-10 bg-gradient-to-r from-[#6A3917] to-[#A67C52] hover:from-[#5A2F13] hover:to-[#935F3B] text-white rounded-lg text-lg font-medium transition-colors cursor-pointer"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>

          <p className="text-center text-gray-600 text-base pt-2">
            {isLogin ? (
              <>
                Register an admin account{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-[#6A3917] hover:text-[#5A2F13] font-medium underline cursor-pointer"
                >
                  here
                </button>
              </>
            ) : (
              <>
                Already an admin?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-[#6A3917] hover:text-[#5A2F13] font-medium underline cursor-pointer"
                >
                  Login here
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;