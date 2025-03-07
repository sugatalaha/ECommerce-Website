import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

export const ProductItem = ({ productId, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link to={`/product/${productId}`}>
            <div 
                key={productId} 
                className="border p-4 shadow-sm rounded transition-transform duration-300 hover:scale-105"
            >
                <img 
                    src={image[0]} 
                    alt={name} 
                    className="w-full h-40 object-cover rounded"
                />
                <span className="block text-gray-700 font-medium mt-2">{currency}{price}</span>
                <h3 className="mt-2 font-semibold text-center">{name}</h3>
            </div>
        </Link>
    );
};
