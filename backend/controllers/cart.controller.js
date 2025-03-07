import User from "../models/user.model.js";

const getCart=async (req,res)=>
{
    try {
        const cartData=req.user.cartData;
        return res.status(200).json({success:true,message:"Cart data retrieved",cartData:cartData});
    } catch (error) {
        console.log("Error in getCart controller:",error);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

const addToCart=async (req,res)=>
{
    try {
        const user=req.user;
        let cartData=user.cartData;
        const {itemId,size}=req.body;
        if(cartData[itemId])
        {
            if(cartData[itemId][size])
            {
                cartData[itemId][size]+=1;
            }
            else 
            {
                cartData[itemId][size]=1;
            }
        }
        else
        {
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        await User.findByIdAndUpdate(req.user._id,
            {
                cartData:cartData
            }
        )
        return res.status(200).json({success:true,message:"Added to cart"});
    } catch (error) {
        console.log("Error in addToCart controller:",error);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

const updateCart=async (req,res)=>
{
    try {
        const {itemId,size,quantity}=req.body;
        const user=req.user;
        let cartData=user.cartData;
        if(cartData[itemId][size])
        {
            if(cartData[itemId][size])
            {
                cartData[itemId][size]=quantity;
            }
        }
        await User.findByIdAndUpdate(user._id,{
            cartData:cartData
        })
        return res.status(200).json({success:true,message:"Cart updated successfully"});
    } catch (error) {
        console.log("Error in updateCart controller:",error);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

export {getCart,updateCart,addToCart};
