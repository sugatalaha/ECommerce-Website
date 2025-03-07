import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
dotenv.config();

const userAuth=async (req,res,next)=>
{
    try {
        const token=req?.cookies?.jwt;
        if(!token)
        {
            return res.status(400).json({message:"Unauthenticated user"});
        }
        else
        {
            const {userId}=jwt.verify(token,process.env.SECRET);
            if(!userId)
            {
                return res.status(400).json({message:"Invalid user"});
            }
            const user=await User.findById(userId).select("-password");
            req.user=user;
            next();
        }
    } catch (error) {
        console.log("Problem in userAuth middleware:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export default userAuth;