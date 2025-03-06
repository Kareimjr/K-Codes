import { assets } from "@/assets/assets";
import { AppContext } from "@/context/AppContext";
import { BrandingContext } from "@/context/BrandingContext";
import axios from "axios";
import { CircleAlert, Eye, EyeOff, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const { brandingData } = useContext(BrandingContext);

  // State for determining whether the user is logging in or signing up
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [residence, setResidence] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for form submission

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    axios.defaults.withCredentials = true;
    try {
      if (state === 'Register') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password, residence });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          console.log('Token received on Register:', data.data.token);
          sessionStorage.setItem('token', JSON.stringify(data.data.token));
          console.log('Stored token in sessionStorage:', sessionStorage.getItem('token'));
          navigate('/');
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          console.log('Token received on Login:', data.data.token);
          sessionStorage.setItem('token', JSON.stringify(data.data.token));
          console.log('Stored token in sessionStorage:', sessionStorage.getItem('token'));
          navigate('/');
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error('No response received from the server');
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  // List of Nigeria states to be used in the select element for the residence field
  const nigeriaStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo",
    "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
    "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
    "Yobe", "Zamfara", "Federal Capital Territory"
  ];

  // Get the logo from branding data or fallback to assets.logo
  const Logo = brandingData?.logo?.url || assets.logo;

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 relative">
      <img
        onClick={() => navigate('/')}
        src={Logo}
        className="absolute left-5 sm:left-14 top-5 w-28 sm:w-32 cursor-pointer"
        alt="Logo"
      />

      <form
        onSubmit={onSubmitHandler}
        className={`absolute flex flex-col space-y-2 w-[400px] bg-white p-5 rounded-2xl shadow-2xl z-10 ${
          state === 'Register' ? 'relative top-10 md:top-8 lg:top-0' : 'relative top-0 md:top-0 lg:top-0'
        }`}
      >
        <p className="text-2xl text-[#2A3571] font-semibold relative flex items-center pl-8">
          {state === 'Register' ? 'Register' : 'Login'}
          <span className="absolute left-0 w-4 h-4 bg-[#2A3571] rounded-full"></span>
          <span className="absolute left-0 w-4 h-4 bg-[#2A3571] rounded-full animate-ping"></span>
        </p>

        <p className="text-gray-600 text-sm">
          {state === 'Register'
            ? 'Enter your details to register.'
            : 'Enter your details to login!'}
        </p>

        {state === 'Register' && (
          <>
            <div className="space-y-2 relative">
              <div className="space-y-0">
                <label className="text-sm text-gray-600">Full Name:</label>
                <input
                  required
                  name="fullname"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#2A3571]"
                  placeholder="Enter your full name"
                />
                <span className="flex gap-1 items-center pt-1">
                  <CircleAlert size={15} className="text-gray-500" />
                  <p className="text-xs text-gray-500">Arrange name how you want it on your certificate</p>
                </span>
              </div>

              <div className="space-y-0">
                <label className="text-sm text-gray-600">Email:</label>
                <input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#2A3571]"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-0">
                <label className="text-sm text-gray-600">State of Residence:</label>
                <select
                  required
                  name="residence"
                  value={residence}
                  onChange={e => setResidence(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#2A3571] bg-white"
                >
                  <option value="" disabled>
                    Select State of Residence
                  </option>
                  {nigeriaStates.map((stateOption) => (
                    <option key={stateOption} value={stateOption}>
                      {stateOption}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative space-y-0 pb-2">
                <label className="text-sm text-gray-600">Password:</label>
                <input
                  required
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-2 pr-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#2A3571]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-0.5 text-gray-500"
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff className="text-gray-400" size={20} /> : <Eye className="text-gray-400" size={20} />}
                </button>
              </div>
            </div>
          </>
        )}

        {state === 'Login' && (
          <>
            <div className="space-y-2 relative">
              <div className="space-y-0">
                <label className="text-sm text-gray-600">Email:</label>
                <input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#2A3571]"
                  placeholder="Enter your email"
                />
              </div>

              <div className="relative space-y-0 pb-2">
                <label className="text-sm text-gray-600">Password:</label>
                <input
                  required
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-2 pr-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#2A3571]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-0.5 text-gray-500"
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff className="text-gray-400" size={20} /> : <Eye className="text-gray-400" size={20} />}
                </button>
              </div>
            </div>

            <p
              onClick={() => navigate('/reset-password')}
              className="text-[#2A3571] text-sm cursor-pointer text-right"
            >
              Forgot Password?
            </p>
          </>
        )}

        {/* Submit Button with Conditional Rendering */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2A3571] hover:bg-[#38406d] hover:scale-105 text-white p-2 rounded-md text-lg transition flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} color="white" />
          ) : (
            state
          )}
        </button>

        {state === 'Register' ? (
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-[#2A3571] hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{' '}
            <span
              onClick={() => setState('Register')}
              className="text-[#2A3571] hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
