import React, { useContext,useState,useEffect } from "react";
import { Title } from "./Title.jsx";
import { ShopContext } from "../Context/ShopContext";
import { ProductItem } from "./ProductItem.jsx";

export const BestSeller=()=>
{
    const {products}=useContext(ShopContext);
    const [bestSellers,setBestSellers]=useState([]);
    useEffect(()=>
    {   
        setBestSellers(products.filter((item)=>item.bestseller).slice(0,5));
    },[])
    return (
        <>
            <Title text1={"BEST"} text2={"SELLERS"}/>
            {/*Rendering best sellers*/}
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {bestSellers.map((item) => ( // Use () or return inside {}
                            <ProductItem 
                                key={item._id} 
                                productId={item._id} 
                                name={item.name} 
                                image={item.image} 
                                price={item.price} 
                            />
                        ))}
                </div>
            </div>
        </>
    )
}