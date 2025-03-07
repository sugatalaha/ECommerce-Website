import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const adminAuth=async (req,res,next)=>
{
    try {
        const jwtToken=req.cookies.jwt;
        if(!jwtToken)
        {
            return res.status(400).json({message:"Invalid token"});
        }
        const {email,password}=jwt.verify(jwtToken,process.env.SECRET);
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD)
        {
            const admin=await User.findOne({email:email});
            req.user=admin;
            next();
        }
        else
        {
            return res.status(400).json({message:"Admin not authenticated"});
        }
    } catch (error) {
        console.log("Error in adminAuth function:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export default adminAuth;