import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";
import { Title } from "./Title.jsx";
import { ProductItem } from "./ProductItem.jsx";

export const LatestCollections = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        // Use slice() instead of splice() to avoid modifying the original array
        setLatestProducts(products.slice(0, 10)); 
    }, [products]); // Add products as a dependency

    return (
        <>
            <Title text1={"LATEST"} text2={"COLLECTIONS"} />

            {/* Product rendering section */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {latestProducts.map((item) => ( // Use () or return inside {}
                    <ProductItem 
                        key={item._id} 
                        productId={item._id} 
                        name={item.name} 
                        image={item.image} 
                        price={item.price} 
                    />
                ))}
            </div>
        </>
    );
};
