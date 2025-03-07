import express from "express";
import { addToCart, getCart, updateCart } from "../controllers/cart.controller.js";
import userAuth from "../middleware/userAuth.middleware.js";

const Router=express.Router();

Router.get("/get",userAuth,getCart);
Router.post("/add",userAuth,addToCart);
Router.post("/update",userAuth,updateCart);

export default Router;