import userModel from "../../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user not found login with correct email and password",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res
        .status(400)
        .json({ message: "password is not matched give right password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "loggedin successfully", user: user });
  } catch (error) {
    return res.status(500).json({
      message: "failed to login",
      error: error.message,
    });
  }
};

export default login;
