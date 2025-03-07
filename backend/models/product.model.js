import mongoose from "mongoose";
const ProductSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        category:
        {
            type:String,
            required:true
        },
        type:
        {
            type:String,
            required:true
        },
        image:
        {
            type:Array,
            required:true
        },
        sizes:
        {
            type:Array,
            required:true
        },
        bestseller:
        {
            type:Boolean,
            required:true,
        },
        price:
        {
            type:Number,
            required:true
        }
    },{timestamps:true}
);

const Product=mongoose.model("product",ProductSchema);
export default Product;