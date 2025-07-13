import express from "express";

import login from "../controller/Auth/login.js";
import register from "../controller/Auth/register.js";

const AuthRouter = express.Router();

AuthRouter.post("/api/auth/register", register);
AuthRouter.post("/api/auth/login", login);

export default AuthRouter;
