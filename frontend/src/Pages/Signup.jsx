import axios from "axios";
import React, { useContext, useState } from "react";
import backendUrl from "../constant";
import toast from "react-hot-toast";
import { ShopContext } from "../Context/ShopContext.jsx";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {fetchUser}=useContext(ShopContext);
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log("Full Name:", fullName, "Email:", email, "Password:", password);
            const user={
                name:fullName,
                email:email,
                password:password
            }
            const response=await axios.post(`${backendUrl}/users/signup`,user,{withCredentials:true});
            toast.success("Signup successfull");
            console.log(response.data.user);
            await fetchUser();
            navigate("/");

        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input 
                            type="text" 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <button 
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};
