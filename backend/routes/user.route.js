import {adminCheckAuth, adminLogin,adminLogout,loginUser,signupUser, userCheckAuth, userLogout} from "../controllers/user.controller.js";
import express from "express";
import adminAuth from "../middleware/adminAuth.middleware.js"
import userAuth from "../middleware/userAuth.middleware.js"

const Router=express.Router();

Router.post("/signup",signupUser);
Router.post("/login",loginUser);
Router.post("/admin-login",adminLogin);
Router.post("/admin-logout",adminAuth,adminLogout);
Router.get("/admin-check-auth",adminAuth,adminCheckAuth);
Router.get("/user-check-auth",userAuth,userCheckAuth);
Router.post("/user-logout",userAuth,userLogout);

export default Router;