import React from "react";
import { Hero } from "../Components/Hero.jsx";
import { LatestCollections } from "../Components/LatestCollections.jsx";
import { BestSeller } from "../Components/BestSeller.jsx";
export const Home=()=>
{
    return(
        <>
        <Hero/>
        <LatestCollections/>
        <BestSeller/>
        </>
    )
}