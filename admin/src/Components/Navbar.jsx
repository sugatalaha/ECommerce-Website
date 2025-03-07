import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import backendUrl from "../constanst/backendUrl";

export const Navbar = ({setIsAuthenticated}) => {
  const handleLogout=async ()=>
  {
    try {
      const response=await axios.post(`${backendUrl}/api/users/admin-logout`,{},{withCredentials:true});
      toast.success(response.data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.message);
      console.log("Problem in handleLogout:",error);
    }
  }
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      {/* Left - Brand Name */}
      <div className="text-xl font-bold">EBazaar</div>

      {/* Right - Logout Button */}
      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};
