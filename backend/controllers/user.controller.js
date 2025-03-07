import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import validator from "validator";

export const generateToken=(userId,res)=>
{
    const token=jwt.sign({userId},process.env.SECRET,
        {
            expiresIn:"7d"
        }
    )

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",   
        secure: true,       
    });
    return token;
}

const loginUser=async (req,res)=>
{
    try {
        const {email,password}=req.body;
        if(!email || !password)
        {
            return res.status(400).json({message:"All fields must be filled"});
        }
        const user=await User.findOne(
            {
                email:email
            }
        )
        if(user)
        {
            const isPasswordCorrect=await bcrypt.compare(password,user.password);
            if(!isPasswordCorrect)
            {
                return res.status(400).json({message:"Incorrect password"});
            }
            generateToken(user._id,res);
            return res.status(200).json(
                {
                    user:
                    {
                        name:user.name,
                        email:user.email,
                        cartData:user.cartData
                    }
                }
            );
        }
        else
        {
            return res.status(400).json("User not logged in!");
        }
        
    } catch (error) {
        console.log("Problem in login route"+error);
        return res.status(500).json("Internal server error");
    }
}

const signupUser=async (req,res)=>
{
    try
    {
        const {name,email,password}=req.body;
        if(!name || !email || !password)
        {
            return res.status(400).json({message:"All fields must be filled!"});
        }
        if(!validator.isEmail(email))
        {
            return res.status(400).json({message:"Invalid email format"});
        }
        if(password?.length<6)
        {
            return res.status(400).json({message:"Password length must be atleast 6"});
        }
        else if(!validator.isStrongPassword(password))
        {
            return res.status(400).json({message:"Enter a strong password"});
        }
        const user=await User.findOne(
            {
                email:email
            }
        )
        if(user)
        {
            return res.status(400).json({message:"User email already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User(
            {
                email:email,
                password:hashedPassword,
                name:name
            }
        );
        if(newUser)
        {
            generateToken(newUser._id,res);
            await newUser.save();
            return res.status(200).json(
                {
                    user:
                    {
                        email:newUser.email,
                        name:newUser.name,
                        cartData:newUser.cartData
                    }
                }
            )
        }
        else{
            return res.status(400).json({message:"Invalid user data"});
        }
    }
    catch(error)
    {
        console.log("Problem in signup route"+error);
        return res.status(500).json("Internal server error");

    }
}
const adminLogin=async (req,res)=>
{
    const {email,password}=req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD)
    {
        const jwtToken=jwt.sign({email,password},process.env.SECRET,
            {
                expiresIn:"7d"
            }
        )
        res.cookie("jwt",jwtToken,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "None",   
            secure: true, 
        })
        return res.status(200).json({message:"Admin logged in successfully"});
    }
    else{
        return res.status(400).json({message:"Invalid credentials"});
    }
}

const adminCheckAuth=(req,res)=>
{
    return res.status(200).json({success:true});
}

const userCheckAuth=(req,res)=>
{
    try{
        return res.status(200).json({success:true,
            user:req.user
        });
    } catch (error) {
        console.log("Error in userCheckAuth function:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

const adminLogout=(req,res)=>
{
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            expires: new Date(0)  // This removes the cookie
          });
        return res.status(200).json({message:"Logout successful!"});
    } catch (error) {
        console.log("Problem in logout route:"+error);
        return res.status(500).json("Internal server error");
    }
}

const userLogout=(req,res)=>
{
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            expires: new Date(0)  // This removes the cookie
          });
        return res.status(200).json({message:"Logout successful!"});
    } catch (error) {
        console.log("Problem in logout route"+error);
        return res.status(500).json("Internal server error");
    }
}

export {loginUser,signupUser,adminLogin,adminCheckAuth,userCheckAuth,adminLogout,userLogout};