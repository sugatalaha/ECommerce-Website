import React, { useContext, useState ,useEffect} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiSearch, FiMenu, FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi"; // Icons from react-icons
import { ShopContext } from "../Context/ShopContext.jsx";
import axios from "axios";
import backendUrl from "../constant.js";
import toast from "react-hot-toast";

export const Navbar = () => {
  const {showSearch,setShowSearch,getCartNumber,fetchUser,user}=useContext(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location=useLocation();
  const handleLogout = async () => {
    try {
      // Implement logout logic here (e.g., clearing auth tokens, redirecting, etc.)
      const response=await axios.post(`${backendUrl}/users/user-logout`,{},{withCredentials:true});
      localStorage.setItem("user",null);
      await fetchUser();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  };

  const handleSearchIconClick=()=>
  {
    setShowSearch(!showSearch && (location.pathname==="/content"));
  }

  useEffect(()=>
  {
    if(location.pathname!=="/content")
    {
      setShowSearch(false);
    }
  },[location])


  return (
    <nav className="bg-white text-black p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">Ebazaar</h1>

        {/* Main Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `hover:text-gray-500 transition duration-200 ${
                isActive ? "text-black font-semibold underline" : ""
              }`
            }
          >
            Home
          </NavLink>
            {!user?
                      <NavLink 
                      to="/login" 
                      className={({ isActive }) => 
                        `hover:text-gray-500 transition duration-200 ${
                          isActive ? "text-black font-semibold underline" : ""
                        }`
                      }
                    >
                      Login
                    </NavLink>:null
              }
          <NavLink 
            to="/content" 
            className={({ isActive }) => 
              `hover:text-gray-500 transition duration-200 ${
                isActive ? "text-black font-semibold underline" : ""
              }`
            }
          >
            Content
          </NavLink>
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button className="hover:text-gray-500 transition duration-200">
            <FiSearch size={22} onClick={handleSearchIconClick}/>
          </button>

          {/* Cart Icon with Badge */}
          <div className="relative">
            {user?<NavLink to="/cart" className="hover:text-gray-500 transition duration-200">
              <FiShoppingCart size={24} />
              {getCartNumber()>0?(
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {getCartNumber()}
                </span>
              ):null}
            </NavLink>:null}
          </div>
          {
            user?
            <button 
            onClick={handleLogout} 
            className="block w-full text-left px-4 py-2 bg-red-600 hover:bg-red-800 rounded-3xl"
          >
            <FiLogOut className="inline mr-2" /> Logout
          </button>:null
          }

          {/* Hamburger Menu Button */}
          <button 
            className="md:hidden hover:text-gray-500 transition duration-200" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FiMenu size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Only visible when menuOpen is true) */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-3">
          <NavLink to="/" className="block hover:text-gray-500 transition duration-200">
            Home
          </NavLink>
          {!user?<NavLink to="/login" className="block hover:text-gray-500 transition duration-200">
            Login
          </NavLink>:null}
          <NavLink to="/content" className="block hover:text-gray-500 transition duration-200">
            Content
          </NavLink>
        </div>
      )}
    </nav>
  );
};

