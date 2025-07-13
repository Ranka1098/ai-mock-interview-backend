import mongoose, { connect } from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ashokranka30:M4XqP0Az6p0QyNpM@cluster0.yvpjjux.mongodb.net/"
    );
    console.log("mongo db connection established");
  } catch (error) {
    console.log("failed to connect database");
  }
};

export default ConnectDb;
