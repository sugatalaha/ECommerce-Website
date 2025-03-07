import express from "express";
import { addProduct, listProducts, removeProduct, singleProduct } from "../controllers/product.controller.js";
import upload from "../middleware/multer.middleware.js";
import adminAuth from "../middleware/adminAuth.middleware.js";

const Router=express.Router();
Router.post("/add",adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
Router.post("/remove",adminAuth,removeProduct);
Router.get("/product-list",listProducts);
Router.get("/single-product",singleProduct);

export default Router;