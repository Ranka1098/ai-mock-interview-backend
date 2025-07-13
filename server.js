import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import ConnectDb from "./src/database/db.js";
import AuthRouter from "./src/routes/authRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/", AuthRouter);

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
