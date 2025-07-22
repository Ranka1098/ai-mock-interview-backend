import userModel from "../../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const googleLogin = async (req, res) => {
  try {
    const { email, photoURL, firstName = "", lastName = "" } = req.body;

    const SECRET_KEY = process.env.SECRET_KEY;

    let user = await userModel.findOne({ email });

    if (user && user.provider !== "google") {
      return res.status(400).json({
        message:
          "This email is already registered with password. Please login with email and password.",
      });
    }

    if (!user) {
      user = await userModel.create({
        firstName,
        lastName,
        email,
        provider: "google",
        isVerified: true,
        picture: photoURL,
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "google Login successful",
      user,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default googleLogin;
