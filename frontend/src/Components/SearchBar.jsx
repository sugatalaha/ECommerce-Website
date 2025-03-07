import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";

export const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  return showSearch ? (
    <>
      <div className="relative w-full max-w-md mx-auto mt-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setShowSearch(false)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
      </div>
    </>
  ) : null;
};
