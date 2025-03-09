import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";
import {ProductItem } from "./ProductItem.jsx";

const RelatedProducts = ({ category, subCategory,productId }) => {
    const { products,fetchData } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.filter(
                (item) => item.category === category && item.type === subCategory && item._id!==productId
            );
            setRelated(productsCopy.slice(0, 5));
        }
    }, [products, category, subCategory]);
    return (
        <div className="mt-8">
            {related.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {related.map((product,index) => (
                        <div key={index}>
                            <ProductItem image={product.image[0]} name={product.name} price={product.price} productId={product._id}/>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No related products found.</p>
            )}
        </div>
    );
};

export default RelatedProducts;
