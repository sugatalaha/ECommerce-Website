import mongoose from "mongoose";

const OrderSchema=new mongoose.Schema(
    {
        userId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        items:
        {
            type:Object
        },
        amount:
        {
            type:Number
        },
        status:
        {
            type:String,
            default:"Order placed"
        },
        paymentMethod:
        {
            type:String
        },
        payment:
        {
            type:Boolean,
            default:false
        },
        address:
        {
            type:Object
        }
    },
    {
        timestamps:true
    }
);

const Order=mongoose.model("Order",OrderSchema);

export default Order;