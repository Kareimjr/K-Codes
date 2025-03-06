import { assets } from "@/assets/assets";
import { AppContext } from "@/context/AppContext";
import { BrandingContext } from "@/context/BrandingContext";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
    const {brandingData} = useContext(BrandingContext);
    const navigate = useNavigate();
    const { backendUrl, setIsLoggedin, userData, setUserData} = useContext(AppContext);

    const logout = async  () =>{
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/logout');
            if (data.success) {
                // Clear session storage
                sessionStorage.clear();
                setIsLoggedin(false);
                setUserData(null);
                navigate('/');
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const Logo =
        brandingData?.logo?.url || assets.logo;

    return ( 
        <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-14 absolute top-0">
            <img src={Logo} className="w-24 sm:w-32" />
            {userData ?
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-[#2A3571] text-white relative group">
                {userData.name[0].toUpperCase()}
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                    <ul className="list-none m-0 p-2 bg-gray-100 text-sm rounded">
                        <li onClick={logout} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">Logout</li>
                    </ul>
                </div>
            </div>
            :
            <button onClick={() =>navigate('/login') }
            className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all">Login
            <img src={assets.arrow_icon} />
            </button>
            }
        </div>
    );
}

export default Navbar;
