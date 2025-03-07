import React, { useState } from "react";
import { CartTotal } from "../Components/CartTotal";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import backendUrl from "../constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Order = () => {
    const {cartItems,user,getCartAmount,getCartData,getItemName}=useContext(ShopContext);
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        phone: "",
        paymentMethod: "COD",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log("Order Details:", formData);
            const ItemClone=structuredClone(cartItems);
            for(const itemId in ItemClone)
            {
                const itemName=getItemName(itemId);
                console.log(itemName);
                if(itemName)
                {
                    ItemClone[itemId].itemName=itemName;
                }
            }
            const data={
                userId:user._id,
                address:
                {
                    firstName:formData.firstName,
                    lastName:formData.lastName,
                    email:formData.email,
                    city:formData.city,
                    country:formData.country,
                    zip:formData.zip,
                    phone:formData.phone,
                },
                paymentMethod:formData.paymentMethod,
                amount:getCartAmount(),
                items:ItemClone
            };
            console.log("Data prepared:",data);
            switch(formData.paymentMethod)
            {
                case "COD":
                    let response=await axios.post(`${backendUrl}/order/place`,data,{withCredentials:true});
                    if(response.data.success){
                        toast.success(response.data.message);
                        getCartData();
                        navigate("/");
                    } 
                case "razorpay":
                    response=await axios.post(`${backendUrl}/order/razorpay`,data,{withCredentials:true});
                    if(response.data.success){
                        toast.success(response.data.message);
                        getCartData();
                        navigate("/");
                    } 
                case "stripe":
                    response=await axios.post(`${backendUrl}/order/stripe`,data,{withCredentials:true});
                    if(response.data.success){
                        toast.success(response.data.message);
                        getCartData();
                        navigate("/");
                    } 
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Order Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
                {/* Left Side: User Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input 
                            type="text" 
                            name="firstName" 
                            placeholder="First Name" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input 
                            type="text" 
                            name="lastName" 
                            placeholder="Last Name" 
                            value={formData.lastName} 
                            onChange={handleChange} 
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="border p-2 rounded w-full"
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input 
                            type="text" 
                            name="city" 
                            placeholder="City" 
                            value={formData.city} 
                            onChange={handleChange} 
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input 
                            type="text" 
                            name="state" 
                            placeholder="State" 
                            value={formData.state} 
                            onChange={handleChange} 
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input 
                            type="text" 
                            name="country" 
                            placeholder="Country" 
                            value={formData.country} 
                            onChange={handleChange} 
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input 
                            type="text" 
                            name="zip" 
                            placeholder="Zip Code" 
                            value={formData.zip} 
                            onChange={handleChange} 
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="Phone Number" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="border p-2 rounded w-full"
                        required
                    />

                    {/* Payment Method */}
                    <div>
                        <h3 className="font-semibold">Payment Method</h3>
                        <div className="flex items-center gap-4 mt-2">
                            <label className="flex items-center gap-2">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="stripe" 
                                    checked={formData.paymentMethod === "stripe"} 
                                    onChange={handleChange}
                                />
                                Stripe
                            </label>
                            <label className="flex items-center gap-2">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="razorpay" 
                                    checked={formData.paymentMethod === "razorpay"} 
                                    onChange={handleChange}
                                />
                                Razorpay
                            </label>
                            <label className="flex items-center gap-2">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="COD" 
                                    checked={formData.paymentMethod === "COD"} 
                                    onChange={handleChange}
                                />
                                Cash on Delivery
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-slate-700 transition">
                        PLACE ORDER
                    </button>
                </form>

                {/* Right Side: Cart Summary */}
                <div className="mt-6 md:mt-0">
                    <CartTotal />
                </div>
            </div>
        </div>
    );
};
