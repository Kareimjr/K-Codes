// src/pages/AdminResetPassword.js
import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from "lucide-react";

const AdminResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpValid, setIsOtpValid] = useState(false);
  const inputRef = React.useRef([]);
  
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingNewPassword, setLoadingNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = (e) => {
    e.preventDefault();
    setLoadingEmail(true);
    // API call removed; simulate success for UI flow
    setTimeout(() => {
      setIsEmailSent(true);
      setLoadingEmail(false);
    }, 1000); // Simulated delay
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    setLoadingOtp(true);
    const otpArray = inputRef.current.map((el) => el.value);
    setOtp(otpArray.join(''));
    // API call removed; simulate success for UI flow
    setTimeout(() => {
      setIsOtpValid(true);
      setLoadingOtp(false);
    }, 1000); // Simulated delay
  };

  const onSubmitNewPassword = (e) => {
    e.preventDefault();
    setLoadingNewPassword(true);
    // API call removed; simulate success for UI flow
    setTimeout(() => {
      setLoadingNewPassword(false);
      // Normally would navigate to login here
    }, 1000); // Simulated delay
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-[400px] w-full bg-white rounded-xl shadow-2xl p-6">
        {/* === EMAIL FORM === */}
        {!isEmailSent && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
              <p className="text-gray-600 text-lg mt-2">Enter your registered admin email</p>
              <p className="text-sm text-gray-500 mt-1">Authorized personnel only</p>
            </div>

            <form onSubmit={onSubmitEmail} className="flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
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

              <button
                type="submit"
                disabled={loadingEmail}
                className="h-10 bg-gradient-to-r from-[#6A3917] to-[#A67C52] hover:from-[#5A2F13] hover:to-[#935F3B] text-white rounded-lg text-lg font-medium transition-colors cursor-pointer flex items-center justify-center"
              >
                {loadingEmail ? <Loader2 className="animate-spin" size={20} /> : 'Submit'}
              </button>
            </form>
          </>
        )}

        {/* === OTP FORM === */}
        {!isOtpValid && isEmailSent && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Reset Password OTP</h2>
              <p className="text-gray-600 text-lg mt-2">Enter the 6-digit code sent to your email</p>
            </div>

            <form onSubmit={onSubmitOTP} className="flex flex-col gap-4">
              <div className="flex justify-between" onPaste={handlePaste}>
                {Array(6).fill().map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    required
                    className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-[#6A3917]"
                    ref={(el) => (inputRef.current[index] = el)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loadingOtp}
                className="h-10 bg-gradient-to-r from-[#6A3917] to-[#A67C52] hover:from-[#5A2F13] hover:to-[#935F3B] text-white rounded-lg text-lg font-medium transition-colors cursor-pointer flex items-center justify-center"
              >
                {loadingOtp ? <Loader2 className="animate-spin" size={20} /> : 'Submit'}
              </button>
            </form>
          </>
        )}

        {/* === NEW PASSWORD FORM === */}
        {isOtpValid && isEmailSent && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">New Password</h2>
              <p className="text-gray-600 text-lg mt-2">Enter your new admin password</p>
            </div>

            <form onSubmit={onSubmitNewPassword} className="flex flex-col gap-4">
              <div className="relative">
                <label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="mt-1 h-10 w-full px-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3917]"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 mt-2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loadingNewPassword}
                className="h-10 bg-gradient-to-r from-[#6A3917] to-[#A67C52] hover:from-[#5A2F13] hover:to-[#935F3B] text-white rounded-lg text-lg font-medium transition-colors cursor-pointer flex items-center justify-center"
              >
                {loadingNewPassword ? <Loader2 className="animate-spin" size={20} /> : 'Submit'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminResetPassword;