import mongoose from "mongoose";

const connectDB=async ()=>
{
    try
    {
        const connection=await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to ",connection.connection.host);
    }
    catch(error)
    {
        console.log("MongoDB connection failed:",error);
    }
}

export default connectDB;