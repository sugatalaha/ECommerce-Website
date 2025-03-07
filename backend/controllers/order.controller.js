import Order from "../models/order.model.js";
import User from "../models/user.model.js";

const payOnCash=async (req,res)=>
{
    try {
        const userId=req.user._id;
        const {items,address,amount,paymentMethod}=req.body;
        const OrderInstance=new Order(
            {
                items,
                address,
                amount,
                paymentMethod:"COD"
            }
        );
        await OrderInstance.save();
        await User.findByIdAndUpdate(userId,{
            cartData:{}
        })
        return res.status(200).json({success:true,message:"Order placed"});

    } catch (error) {
        console.log("Error in placeOrderCash controller:",error);
        return res.status(500).json({success:false,message:"Internal server error"});
    }

}

const placeOrderRazorpay=async (req,res)=>
{

}

const placeOrderStripe=async (req,res)=>
{

}

const allOrders=async (req,res)=>
{
    try {
        const orders=await Order.find();
        return res.status(200).json({success:true,message:"All orders retrieved",orders:orders});
    } catch (error) {
        console.log("Error in allOrders controller:",error);
        return res.status(500).json({success:false,message:"Internal server error"});
    }

}

const userOrders=async (req,res)=>
{
    try {
        const userId=req.user._id;
        const myOrders=await Order.findOne({userId:userId});
        return res.status(200).json({success:true,message:"User orders retrieved",orders:myOrders});
    } catch (error) {
        console.log("Error in userOrders controller:",error);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
    
}

const updateStatus=async (req,res)=>
{

}

export {allOrders,userOrders,placeOrderRazorpay,payOnCash,placeOrderStripe,updateStatus};