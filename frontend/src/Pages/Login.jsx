import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext.jsx";
import axios from "axios";
import backendUrl from "../constant";
import toast from "react-hot-toast";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {fetchUser}=useContext(ShopContext);
    const navigate=useNavigate();

    const handleSubmit = async  (e) => {
        try {
            e.preventDefault();
            const response=await axios.post(`${backendUrl}/users/login`,{email:email,password:password},{withCredentials:true});
            toast.success("User logged in successfully");
            await fetchUser();
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-gray-900 text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-700 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-blue-600 font-medium hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};
