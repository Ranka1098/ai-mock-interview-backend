import userModel from "../../model/user.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "user already exist register Please  register with new email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "new user created successfully", user: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to create user", error: error.message });
  }
};

export default register;
