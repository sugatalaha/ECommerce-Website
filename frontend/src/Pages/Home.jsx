import React, { useContext } from "react";
import { Hero } from "../Components/Hero.jsx";
import { LatestCollections } from "../Components/LatestCollections.jsx";
import { BestSeller } from "../Components/BestSeller.jsx";
import { ShopContext } from "../Context/ShopContext.jsx";
export const Home=()=>
{
    const {isDataFetching}=useContext(ShopContext);
    if (isDataFetching) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
      }
    return(
        <>
        <Hero/>
        <br/>
        <LatestCollections/>
        <br/>
        <BestSeller/>
        </>
    )
}