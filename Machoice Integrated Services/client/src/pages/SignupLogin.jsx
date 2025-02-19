// src/pages/SignupLogin.js
import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const SignupLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const revealRef = useReveal({ threshold: 0.2 });

  return (
    <div className="my-12 px-4 bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <div ref={revealRef} className="max-w-[400px] mx-auto bg-white rounded-xl shadow-2xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Welcome back!' : 'Join us today!'}
          </h2>
          <p className="text-gray-600 text-lg mt-2">
            {isLogin ? 'Login to your account' : 'Sign up now to become a member'}
          </p>
        </div>

        <form className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Enter Name"
              className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3917]"
              required
            />
          )}
          <input
            type="email"
            placeholder="Enter Email"
            className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3917]"
            required
          />
          <input
            type="password"
            placeholder={isLogin ? 'Password' : 'Choose A Password'}
            className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3917]"
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Re-Enter Password"
              className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3917]"
              required
            />
          )}

          <button
            type="submit"
            className="h-10 bg-gradient-to-r from-[#6A3917] to-[#A67C52] hover:from-[#5A2F13] hover:to-[#935F3B] text-white rounded-lg text-lg font-medium transition-colors cursor-pointer"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>

          <p className="text-center text-gray-600 text-base pt-2">
            {isLogin ? (
              <>
                Not a member?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-[#6A3917] hover:text-[#5A2F13] font-medium underline cursor-pointer"
                >
                  Signup here
                </button>
              </>
            ) : (
              <>
                Already a member?{' '}
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

export default SignupLogin;