import Product from "../models/product.model.js";
import {v2 as cloudinary} from "cloudinary";
import {cloudinaryConfig} from "../config/cloudinary.js";
import { configDotenv } from "dotenv";
configDotenv();
await cloudinaryConfig();
const addProduct=async (req,res)=>
{
    try {
        const {name,category,type,sizes,bestseller,description,price}=req.body;
        const image1=req.files?.image1;
        const image2=req.files?.image2;
        const image3=req.files?.image3;
        const image4=req.files?.image4;
        const images=[image1,image2,image3,image4].filter(image=>image!==undefined);
        const imageUrls=await Promise.all(images.map(async (image,index)=>
        {
            try {
                const response=await cloudinary.uploader.upload(image[0].path);
                return response.secure_url;
            } catch (error) {
                console.log(error);
                return res.status(500).json({message:"Internal server error"});
            }
        }));
        const product=new Product(
            {
                category,
                type,
                price:Number.parseInt(price),
                name,
                sizes:JSON.parse(sizes),
                description,
                bestseller:bestseller==="true"?true:false,
                image:imageUrls,
                description
            }
        )
        await product.save();
        return res.status(200).json({message:"Product added successfully!",product:product});
    } catch (error) {
        console.log("Error in addProduct controller:",error);
        return res.status(500).json({message:"Internal server error"})
    }

}

const listProducts=async (req,res)=>
    {
        try {
            const products=await Product.find().sort({ createdAt: -1 });
            return res.status(200).json({message:"All prodcucts fetched",products});
        } catch (error) {
            console.log("Error in listProducts controller:",error);
            return res.status(500).json({message:"Internal server error"})
        }
    }

const removeProduct=async (req,res)=>
{
    try {
        const {productId}=req.body;
        await Product.findByIdAndDelete(productId);
        return res.status(200).json({message:"Product deleted successfully"});
    } catch (error) {
        console.log("Error in removeProduct controller:",error);
        return res.status(500).json({message:"Internal server error"})
    }
    
}

const singleProduct=async (req,res)=>
{
    try {
        const {productId}=req.body;
        const product=await Product.findById(productId);
        return res.status(200).json({message:"Product fetched successfully",product});
    } catch (error) {
        console.log("Error in singleProduct controller:",error);
        return res.status(500).json({message:"Internal server error"})
    }
    
}

const addReview=async (req,res)=>
{
    try {
        const {text,productId,username,userRating,userId}=req.body;
        const product=await Product.findById(productId);
        if(text!=="" || userRating!==0)
        {
            product.reviews.push({text:text,user:username,rating:userRating,userId:userId});
        }
        if(userRating!==0)
        {
            const {totalRating,countReviewers}=product.rating;
            let newTotalRating=totalRating+userRating;
            let newCountReviewers=countReviewers+1;
            product.rating={totalRating:newTotalRating,countReviewers:newCountReviewers};
        }
        await Product.findByIdAndUpdate(productId,{
            reviews:product.reviews,
            rating:product.rating
        });
        return res.status(200).json({success:true,message:"Review added successfully"});
    } catch (error) {
        console.log("Error in addReview controller ",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export {addProduct,removeProduct,singleProduct,listProducts,addReview};