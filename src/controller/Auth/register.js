import userModel from "../../model/user.js";
import bcrypt from "bcrypt";
import sendEmail from "./sendEmail.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, 10);

    // this code two situation ko handle kar rah hai
    // 1. Agar user already exist karta hai — aur verify hua hai ya nahi, uska alag logic hai.
    // 2. Agar user exist nahi karta — toh aap new user create kar rahe ho + OTP bhej rahe ho.

    // case 1.user exist but not verified
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({
          message:
            "user already exist register Please  register with new email",
        });
      } else {
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.otp = otp;
        existingUser.otpExpires = otpExpires;
        existingUser.password = hashedPassword;
        await existingUser.save();

        await sendEmail(
          email,
          `send OTP on your email`,
          `Please verify your email using this OTP: ${otp}`
        );

        return res
          .status(200)
          .json({ message: "otp resend your email plss check and verify" });
      }
    }

    // case 2.user not exist create new user

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      isVerified: false,
    });

    await sendEmail(
      email,
      `send OTP on your email`,
      `Please verify your email using this OTP: ${otp}`
    );

    res.status(201).json({
      message: "User registered successfully, OTP sent to your email",
      user: { email: newUser.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to create user", error: error.message });
  }
};

export default register;
