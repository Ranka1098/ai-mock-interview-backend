import express from "express";

import login from "../controller/Auth/login.js";
import register from "../controller/Auth/register.js";
import verifyOtp from "../controller/Auth/verifyOtp.js";
import forgetPassword from "../controller/Auth/forgetPassword.js";
import verifyPassword from "../controller/Auth/verifyPassword.js";

const AuthRouter = express.Router();

AuthRouter.post("/api/auth/register", register);
AuthRouter.post("/api/auth/login", login);
AuthRouter.post("/api/auth/verifyOtp", verifyOtp);
AuthRouter.post("/api/auth/forgetpassword", forgetPassword);
AuthRouter.post("/api/auth/verifypassword", verifyPassword);

export default AuthRouter;
