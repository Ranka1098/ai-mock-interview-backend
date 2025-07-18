import userModel from "../../model/user.js";

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email not exist" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "user alrady verified" });
    }

    if (user.otp !== String(otp)) {
      return res
        .status(400)
        .json({ message: "otp is not matched try with valid otp" });
    }

    // check otp expires with current date
    // Agar OTP ka expire time (user.otpExpires) current time se pehle ka hai, iska matlab OTP expire ho chuka hai.
    if (user.otpExpires < new Date()) {
      return res
        .status(400)
        .json({ message: "otp is expired login with new otp" });
    }

    //  user ne sahi OTP dal diya ho, yaani OTP valid hai aur expire nahi hua.
    user.isVerified = true; //  User ka account ab verify ho chuka hai.
    user.otp = null; //  OTP ko hata diya gaya hai, ab kisi kaam ka nahi hai.
    user.otpExpires = null; //  OTP expiry time ko bhi hata diya gaya hai. Kyunki OTP already use ho chuka hai, to ab expire hone ka time bhi irrelevant hai.

    // user save in data base
    await user.save();

    res.status(200).json({ message: "user is verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to verify otp", error: error.message });
  }
};
export default verifyOtp;
