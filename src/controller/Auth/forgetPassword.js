import userModel from "../../model/user.js";
import sendEmail from "../Auth/sendEmail.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // generates 6-digit OTP
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (user.provider === "google") {
      return res.status(400).send({
        message:
          "This account was registered via Google. Please use Google login.",
      });
    }

    if (!user) {
      return res.status(400).send({ message: "user not exist" });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    const emailSent = await sendEmail(
      email,
      `Your OTP for password reset is: ${otp}`
    );
    if (!emailSent) {
      return res
        .status(500)
        .send({ message: "failed to send email plss try again" });
    }

    res.status(200).send({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

export default forgetPassword;
