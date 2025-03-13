import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext.jsx";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import RelatedProducts from "../Components/RelatedProducts.jsx";
import { Title } from "../Components/Title.jsx";

export const Product = () => {
    const { productId } = useParams();
    const { products, addToCart, user, sendReview } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedSize, setSelectedSize] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const foundProduct = products.find(item => item._id === productId);
        if (foundProduct) {
            setProductData(foundProduct);
            setSelectedImage(foundProduct.image[0]);
            setReviews(foundProduct.reviews || []);
        }
    }, [productId, products]);

    const addReview = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (newReview.trim() === "" &&  newRating === 0) return;
        const review = { username: user.name, text: newReview, productId: productId, userRating: newRating };
        await sendReview(review);
        setReviews([...reviews, { user: user.name, text: newReview, rating: newRating }]);
        setNewReview("");
        setNewRating(0);
    };

    return productData ? (
        <>
            <div className="flex p-8 space-x-8 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
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
                <div className="flex flex-col w-3/4 space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{productData.name}</h1>
                        <div className="flex items-center space-x-1 text-yellow-500">
                            {Array.from({ length: Math.round(productData.rating ? productData.rating.totalRating / productData.rating.countReviewers : 4) }).map((_, i) => (
                                <FaStar key={i} />
                            ))}
                            <span className="text-gray-600 text-sm ml-2">
                                {productData.rating ? Number(productData.rating.totalRating / productData.rating.countReviewers).toFixed(1) : "4.0"} / 5
                            </span>
                        </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-700">${productData.price}</p>
                    <img src={selectedImage} alt="Selected" className="w-full h-96 object-contain border border-gray-300 rounded-lg" />
                    <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold">Size:</span>
                        {productData.sizes.map((size) => (
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
                    <div className="flex space-x-4">
                        <button className="px-6 py-3 flex items-center bg-black text-white font-semibold rounded-md hover:bg-gray-700 transition" onClick={() => {
                            if (!user) {
                                navigate("/login");
                                return;
                            } else addToCart(productData, selectedSize);
                        }}>
                            <FaShoppingCart className="mr-2" /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto p-8 bg-gray-100 rounded-lg mt-8">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review, index) => (
                            <div key={index} className="p-4 bg-white shadow rounded-md">
                                <p className="font-semibold">{review.user}</p>
                                <div className="flex items-center text-yellow-500">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>
                                <p className="text-gray-700">{review.text}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No reviews yet.</p>
                )}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Add a Review</h3>
                    <textarea 
                        className="w-full p-2 border rounded-md" 
                        placeholder="Write your review..." 
                        value={newReview} 
                        onChange={(e) => setNewReview(e.target.value)}
                    />
                    <div className="flex items-center space-x-2 mt-2">
                        <span className="text-lg">Your Rating:</span>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar 
                                key={i} 
                                className={`cursor-pointer ${newRating > i ? "text-yellow-500" : "text-gray-300"}`}
                                onClick={() => setNewRating(i + 1)}
                            />
                        ))}
                    </div>
                    <button 
                        className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-700 transition" 
                        onClick={addReview}
                    >
                        Submit Review
                    </button>
                </div>
            </div>
            <Title text1={"RELATED"} text2={"PRODUCTS"}/>
            <RelatedProducts category={productData.category} subCategory={productData.type} productId={productId}/>
        </>
    ) : (
        <div className="text-center p-8 text-xl font-semibold">Item not found!</div>
    );
};
