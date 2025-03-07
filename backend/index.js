import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

const app=express();
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"
        ,"http://localhost:5175","http://localhost:5176"
    ],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

const port=process.env.PORT||4000;

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>
{
    return res.status(200).send("API working!")
})

app.listen(port,async ()=>
{
    console.log(`Server listening on port ${port}`);
    await connectDB();
})