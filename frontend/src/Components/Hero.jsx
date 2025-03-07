import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

export const Hero = () => {
  const {sortedProducts}=useContext(ShopContext);
  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-white shadow-md p-8">
      {/* Left Side - Text Content */}
      <div className="md:w-1/2 text-center md:text-left p-4">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Our Bestsellers</p>
        <h1 className="prata-regular text-4xl font-bold mb-4">Latest Arrivals</h1>
      </div>
      
      {/* Right Side - Image */}
      <div className="md:w-1/2 flex justify-center">
      <Link to={`/product/${sortedProducts[0]?._id}`}>
      <img 
          src={sortedProducts[0]?.image[0]} 
          alt="Latest Arrivals" 
          className="max-w-sm md:max-w-md rounded-lg shadow-lg"
        />
      </Link>
      </div>
    </section>
  );
};
