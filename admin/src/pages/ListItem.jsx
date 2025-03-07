import React, { useState, useEffect } from "react";
import axios from "axios";
import backendUrl from "../constanst/backendUrl.js";
import { toast } from "react-toastify";

export const ListItem = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/products/product-list`, { withCredentials: true });
            setProducts(response.data.products);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleRemove = async (productId) => {
        try {
            const response=await axios.post(`${backendUrl}/api/products/remove`,{productId:productId}, { withCredentials: true });
            await fetchData();
            toast.success("Product removed successfully");
        } catch (error) {
            toast.error("Failed to remove product");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Product List</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Image</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Price</th>
                            <th className="border border-gray-300 p-2">Category</th>
                            <th className="border border-gray-300 p-2">Subcategory</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="text-center border border-gray-300">
                                <td className="border border-gray-300 p-2">
                                    <img 
                                        src={product?.image[0]} 
                                        alt={""} 
                                        className="w-16 h-16 object-cover mx-auto"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">{product.name}</td>
                                <td className="border border-gray-300 p-2">${product.price}</td>
                                <td className="border border-gray-300 p-2">{product.category}</td>
                                <td className="border border-gray-300 p-2">{product.type}</td>
                                <td className="border border-gray-300 p-2">
                                    <button 
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => handleRemove(product._id)}
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
