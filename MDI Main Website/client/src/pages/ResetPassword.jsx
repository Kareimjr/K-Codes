import { assets } from "@/assets/assets";
import { AppContext } from "@/context/AppContext";
import { BrandingContext } from "@/context/BrandingContext";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Import the spinner icon

function ResetPassword() {
  const { brandingData } = useContext(BrandingContext);
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpValid, setIsOtpValid] = useState(false);
  const inputRef = React.useRef([]);

  // --- NEW LOADING STATES ---
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingNewPassword, setLoadingNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  // Handles auto-focusing on the next OTP input field
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  // Handles backspace navigation in OTP input fields
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  // Handles paste of the OTP code
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  // --- EMAIL SUBMISSION ---
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoadingEmail(true); // Start loading for email submission

    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) {
        setIsEmailSent(true);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingEmail(false); // End loading regardless of success or failure
    }
  };

  // --- OTP SUBMISSION ---
  const onSubmitOTP = async (e) => {
    e.preventDefault();
    setLoadingOtp(true); // Start loading for OTP verification
    const otpArray = inputRef.current.map((el) => el.value);
    setOtp(otpArray.join(''));

    try {
      const { data } = await axios.post(backendUrl + '/api/auth/verify-otp', { email, otp: otpArray.join('') });
      if (data.success) {
        setIsOtpValid(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoadingOtp(false); // End loading for OTP form
    }
  };

  // --- NEW PASSWORD SUBMISSION ---
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoadingNewPassword(true); // Start loading for new password submission

    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error("Error Response:", error.response);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoadingNewPassword(false); // End loading for new password form
    }
  };

  // Use the branding logo if available, or fallback to the asset logo
  const Logo = brandingData?.logo?.url || assets.logo;

  return (
    // Outer container with a gradient background and the clickable logo
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 relative">
      <img
        onClick={() => navigate('/')}
        src={Logo}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        alt="Logo"
      />

      {/* === EMAIL FORM: Shown when no email has been sent === */}
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="flex flex-col space-y-2 w-[400px] bg-white p-5 rounded-2xl shadow-2xl">
          {/* Title with floating blue dot design */}
          <div className="space-y-2 mb-2">
            <p className="text-2xl text-[#2A3571] font-semibold relative flex items-center pl-8">
              Password Reset
              <span className="absolute left-0 w-4 h-4 bg-[#2A3571] rounded-full"></span>
              <span className="absolute left-0 w-4 h-4 bg-[#2A3571] rounded-full animate-ping"></span>
            </p>
            <p className="text-gray-600 text-sm">Enter your registered email address</p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#2A3571]"
            />
          </div>

          {/* Submit button with spinner for email form */}
          <button
            type="submit"
            disabled={loadingEmail}
            className="w-full bg-[#2A3571] hover:bg-[#38406d] hover:scale-105 text-white p-2 rounded-md text-lg transition flex items-center justify-center"
          >
            {loadingEmail ? <Loader2 className="animate-spin" size={20} color="white" /> : "Submit"}
          </button>
        </form>
      )}

      {/* === OTP FORM: Shown after email is sent but OTP is not yet valid === */}
      {!isOtpValid && isEmailSent && (
        <form onSubmit={onSubmitOTP} className="flex flex-col space-y-2 w-[400px] bg-white p-5 rounded-2xl shadow-2xl">
          <p className="text-2xl text-[#2A3571] font-semibold relative flex items-center pl-8 mb-1">
            Reset Password OTP
            <span className="absolute left-0 w-4 h-4 bg-[#2A3571] rounded-full"></span>
            <span className="absolute left-0 w-4 h-4 bg-[#2A3571] rounded-full animate-ping"></span>
          </p>
          <p className="text-gray-600 text-sm mb-2">Enter the 6-digit code sent to your email ID</p>

          {/* Container for OTP inputs; supports paste */}
          <div>
            <div className="flex justify-between mb-2" onPaste={handlePaste}>
              {Array(6)
                .fill()
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    required
                    placeholder=""
                    className="w-12 h-12 border border-gray-300 rounded-md outline-none text-center text-xl focus:ring-2 focus:ring-[#2A3571]"
                    ref={(el) => (inputRef.current[index] = el)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
            </div>
          </div>

          {/* Submit button with spinner for OTP form */}
          <button
            type="submit"
            disabled={loadingOtp}
            className="w-full bg-[#2A3571] hover:bg-[#38406d] hover:scale-105 text-white p-2 rounded-md text-lg transition flex items-center justify-center"
          >
            {loadingOtp ? <Loader2 className="animate-spin" size={20} color="white" /> : "Submit"}
          </button>
        </form>
      )}

      {/* === NEW PASSWORD FORM: Shown once OTP is verified === */}
      {isOtpValid && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className="flex flex-col space-y-2 w-[400px] bg-white p-5 rounded-2xl shadow-2xl">
          <div className="space-y-2 mb-2">
            <p className="text-2xl text-[#2A3571] font-semibold relative flex items-center pl-8">
              New Password
              <span className="absolute left-0 w-4 h-4 bg-[#2A3571] rounded-full"></span>
              <span className="absolute left-0 w-4 h-4 bg-[#2A3571] rounded-full animate-ping"></span>
            </p>
            <p className="text-gray-600 text-sm">Enter your new password below</p>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                className="w-full p-2 pr-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#2A3571]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-2.5 text-gray-500"
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff className="text-gray-400" size={20} /> : <Eye className="text-gray-400" size={20} />}
              </button>
            </div>
          </div>

          {/* Submit button with spinner for new password form */}
          <button
            type="submit"
            disabled={loadingNewPassword}
            className="w-full bg-[#2A3571] hover:bg-[#38406d] hover:scale-105 text-white p-2 rounded-md text-lg transition flex items-center justify-center"
          >
            {loadingNewPassword ? <Loader2 className="animate-spin" size={20} color="white" /> : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
