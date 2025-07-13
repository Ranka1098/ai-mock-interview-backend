import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 15,
      minLength: 4,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      maxLength: 15,
      minLength: 4,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: 6,
      maxLength: 15,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
