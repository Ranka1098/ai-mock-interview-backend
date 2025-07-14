import userModel from "../../model/user.js";
import bcrypt from "bcrypt";

const verifyPassword = async (req, res) => {
  try {
    const { otp, password } = req.body;

    const user = await userModel.findOne({ otp });
    if (!user) {
      return res.status(400).send({ message: "user not found" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).send({ message: "otp is expired resend otp" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).send({ message: "password updated successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "failed to update password", error: error.message });
  }
};

export default verifyPassword;
