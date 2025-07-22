import express from "express";

import login from "../controller/Auth/login.js";
import register from "../controller/Auth/register.js";
import verifyOtp from "../controller/Auth/verifyOtp.js";
import forgetPassword from "../controller/Auth/forgetPassword.js";
import verifyPassword from "../controller/Auth/verifyPassword.js";
import resendOtp from "../controller/Auth/resendotp.js";
import googleLogin from "../controller/Auth/googleLogin.js";
import authMiddleware from "../middleware/authMiddleware.js";
import profile from "../controller/Auth/profile.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/verifyOtp", verifyOtp);
AuthRouter.post("/forgetpassword", forgetPassword);
AuthRouter.post("/verifypassword", verifyPassword);
AuthRouter.post("/resendotp", resendOtp);
AuthRouter.post("/googleLogin", googleLogin);
AuthRouter.get("/profile", authMiddleware, profile);

export default AuthRouter;
