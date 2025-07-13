import userModel from "../../model/user.js";
import bcrypt from "bcrypt";

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

    res.status(200).json({ message: "loggedin successfully", user: user });
  } catch (error) {
    return res.status(500).json({
      message: "failed to login",
      error: error.message,
    });
  }
};

export default login;
