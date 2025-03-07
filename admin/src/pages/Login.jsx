import React, { useState } from "react";
import axios from "axios";
import backendUrl from "../constanst/backendUrl.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const Login = ({setIsAuthenticated}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      console.log("Email:", email);
      console.log("Password:", password);
      // Add authentication logic here
      const response=await axios.post(`${backendUrl}/api/users/admin-login`,{email:email,password:password},{withCredentials:true});
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log("Error in handleLogin:",error);
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        
        <form  className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
