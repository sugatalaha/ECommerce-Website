import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";
import { Title } from "../Components/Title.jsx";
import { FaTrash } from "react-icons/fa"; // Import delete icon
import { CartTotal } from "../Components/CartTotal.jsx";

export const Cart = () => {
    const { products, cartItems, updateCartItem, removeCartItem,currency ,navigate} = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    tempData.push({
                        _id: itemId,
                        size: size,
                        quantity: cartItems[itemId][size],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    return (
        <div className="w-4/5 mx-auto p-6">
            <Title text1={"YOUR"} text2={"CART"} />
            {cartData.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">Your cart is empty!</p>
            ) : (
                <div className="space-y-4">
                    {cartData.map((item) => {
                        const product = products.find((p) => p._id === item._id);
                        return (
                            <div key={`${item._id}-${item.size}`} className="flex items-center justify-between bg-white shadow-md rounded-lg p-4">
                                {/* Product Image */}
                                <img src={product?.image[0]} alt={product?.name} className="w-16 h-16 rounded-md object-cover" />
                                
                                {/* Product Details */}
                                <div className="flex-1 ml-4">
                                    <h3 className="text-lg font-semibold">{product?.name}</h3>
                                    <p className="text-gray-500">{currency} {product.price}</p> 
                                </div>

                                {/* Size */}
                                <p className="text-gray-600 font-medium">{item.size}</p>

                                {/* Quantity Input */}
                                <input
                                    type="number"
                                    className="border border-gray-300 rounded-md w-12 text-center py-1"
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) =>
                                        updateCartItem(item._id, item.size, parseInt(e.target.value) || 1)
                                    }
                                />

                                {/* Delete Button */}
                                <FaTrash className="text-red-500 cursor-pointer hover:text-red-700" 
                                    onClick={() => removeCartItem(item._id, item.size)}
                                />
                            </div>
                        );
                    })}
                    <CartTotal/>
                    <button className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition" onClick={(e)=>
                        {
                            navigate("/order");
                        }
                    }>
                        Proceed to Checkout
            </button>
                </div>
            )}
        </div>
    );
};
