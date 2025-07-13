import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ConnectDb = async () => {
  const URL = process.env.MONGO_URL;

  try {
    await mongoose.connect(URL);
    console.log("mongo db connection established");
  } catch (error) {
    console.log("failed to connect database");
  }
};

export default ConnectDb;
