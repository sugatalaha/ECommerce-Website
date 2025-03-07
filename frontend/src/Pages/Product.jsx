import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext.jsx";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import RelatedProducts from "../Components/RelatedProducts.jsx";
import { Title } from "../Components/Title.jsx";

export const Product = () => {
    const { productId } = useParams();
    const { products ,addToCart,user} = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedSize, setSelectedSize] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const foundProduct = products.find(item => item._id === productId);
        if (foundProduct) {
            setProductData(foundProduct);
            setSelectedImage(foundProduct.image[0]);
        }
    }, [productData,products]);

    const sizes = ["S", "M", "XL"];

    return productData ? (
        <>
        <div className="flex p-8 space-x-8 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
            {/* Image Thumbnails */}
            <div className="flex flex-col space-y-4 w-1/4">
                {productData.image.map((img, index) => (
                    <img 
                        key={index} 
                        src={img} 
                        alt={`Thumbnail ${index}`} 
                        className={`w-20 h-20 object-cover cursor-pointer border-2 transition duration-200 ${
                            selectedImage === img ? "border-black" : "border-gray-300 hover:border-black"
                        }`} 
                        onClick={() => setSelectedImage(img)}
                    />
                ))}
            </div>

            {/* Main Image & Product Details */}
            <div className="flex flex-col w-3/4 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">{productData.name}</h1>
                    <div className="flex items-center space-x-1 text-yellow-500">
                        {Array.from({ length: Math.round(productData.rating || 4) }).map((_, i) => (
                            <FaStar key={i} />
                        ))}
                        <span className="text-gray-600 text-sm ml-2">
                            {productData.rating ? productData.rating.toFixed(1) : "4.0"} / 5
                        </span>
                    </div>
                </div>

                <p className="text-lg font-semibold text-gray-700">${productData.price}</p>
                <img src={selectedImage} alt="Selected" className="w-full h-96 object-contain border border-gray-300 rounded-lg" />
                
                {/* Size Selection */}
                <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold">Size:</span>
                    {sizes.map((size) => (
                        <button 
                            key={size}
                            className={`px-4 py-2 border-2 rounded-md font-semibold transition ${
                                selectedSize === size ? "border-black bg-black text-white" : "border-gray-400 text-black hover:border-black"
                            }`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>

                {/* Add to Cart Button */}
                <div className="flex space-x-4">
                    <button className="px-6 py-3 flex items-center bg-black text-white font-semibold rounded-md hover:bg-gray-700 transition" onClick={(e)=>
                        {
                            if(!user)
                            {
                                navigate("/login");
                                return;
                            }
                            else addToCart(productData,selectedSize);
                        }
                    }>
                        <FaShoppingCart className="mr-2" /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
        <br/>
        <Title text1={"RELATED"} text2={"PRODUCTS"}/>
        <RelatedProducts category={productData.category} subCategory={productData.type} productId={productId}/>
        </>
    ) : (
        <div className="text-center p-8 text-xl font-semibold">Item not found!</div>
    );
};
