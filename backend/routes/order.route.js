import {allOrders,userOrders,placeOrderRazorpay,payOnCash,placeOrderStripe,updateStatus} from "../controllers/order.controller.js";
import express from "express";
import userAuth from "../middleware/userAuth.middleware.js";
import adminAuth from "../middleware/adminAuth.middleware.js";
const router=express.Router();
router.post("/place",userAuth,payOnCash);
router.post("/stripe",userAuth,placeOrderStripe);
router.post("/razorpay",userAuth,placeOrderRazorpay);
router.get("/my-orders",userAuth,userOrders);
router.get("/all-orders",adminAuth,allOrders);
router.post("/update-status",adminAuth,updateStatus);

export default router;