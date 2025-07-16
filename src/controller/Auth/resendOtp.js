import userModel from "../../model/user.js";
import sendEmail from "./sendEmail.js";

const generateOtp = () => Math.floor(100000 + Math.random() * 90000).toString();

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user is not exist" });
    }

    //   check previous otp expire or not
    if (user.otpExpires > new Date()) {
      return res
        .status(400)
        .json({ message: "plese wait OTP is not expired yet" });
    }

    const newOtp = generateOtp();
    const otpExpires = new Date(Date.now() + 60 * 1000);

    user.otp = newOtp;
    user.otpExpires = otpExpires;

    await user.save();

    await sendEmail(email, "resend OTP", `your new otp is ${newOtp}`);

    res.status(200).json({ message: "new otp sent your email" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "faile to create new otp", error: error.message });
  }
};

export default resendOtp;
