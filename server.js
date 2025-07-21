import express from "express";
import cors from "cors";
import ConnectDb from "./src/database/db.js";
import AuthRouter from "./src/routes/authRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    withCredential: true,
  })
);
const PORT = process.env.PORT || 3000;

app.use("/api/auth", AuthRouter);

ConnectDb()
  .then(() => {
    console.log("server running");
    app.listen(PORT, () => {
      console.log(`server is listening on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });
