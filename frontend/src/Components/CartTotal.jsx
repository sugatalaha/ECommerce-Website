import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

export const CartTotal = () => {
    const { getCartAmount, currency,deliveryFee } = useContext(ShopContext);

    return (
        <div className="border p-4 rounded shadow-md bg-white max-w-sm mx-auto mt-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Order Summary</h2>
            
            <div className="flex justify-between mt-2 text-gray-700">
                <span>Subtotal:</span>
                <span>{currency} {getCartAmount()}.00</span>
            </div>
            
            <div className="flex justify-between mt-2 text-gray-700">
                <span>Shipping Fee:</span>
                <span>{currency} 50.00</span>
            </div>
            
            <div className="flex justify-between mt-2 text-gray-700">
                <span>Delivery Fee:</span>
                <span>{currency} {deliveryFee}.00</span>
            </div>

            <div className="flex justify-between mt-4 text-lg font-bold text-gray-900 border-t pt-2">
                <span>Total:</span>
                <span>{currency} {getCartAmount()+deliveryFee+50}.00</span>
            </div>
        </div>
    );
};
