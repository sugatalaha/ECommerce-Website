import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

export const ProductItem = ({ productId, image, name, price }) => {
    const { currency, isDataFetching} = useContext(ShopContext);
    if(isDataFetching)
    {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <Link to={`/product/${productId}`}>
            <div 
                key={productId} 
                className="border p-4 shadow-sm rounded transition-transform duration-300 hover:scale-105"
            >
                <img 
                    src={image[0]} 
                    alt={name} 
                    className="product-image"
                />
                <span className="block text-gray-700 font-medium mt-2">{currency}{price}</span>
                <h3 className="mt-2 font-semibold text-center">{name}</h3>
            </div>
        </Link>
    );
};
