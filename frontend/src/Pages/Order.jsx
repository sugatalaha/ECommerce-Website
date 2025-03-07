import React, { useState } from "react";
import { CartTotal } from "../Components/CartTotal";

export const Order = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        phone: "",
        paymentMethod: "stripe",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Order Details:", formData);
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
                                    value="cod" 
                                    checked={formData.paymentMethod === "cod"} 
                                    onChange={handleChange}
                                />
                                Cash on Delivery
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        Place Order
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
