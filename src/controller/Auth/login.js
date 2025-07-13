import userModel from "../../model/user.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user not found login with correct email and password",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "password is wrong" });
    }

    res.status(200).json({ message: "loggedin successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "failed to login",
      error: error.message,
    });
  }
};

export default login;
