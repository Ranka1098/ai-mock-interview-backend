import userModel from "../../model/user.js";

const googleLogin = async (req, res) => {
  try {
    const { email, photoURL, firstName = "", lastName = "" } = req.body;

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

    res.status(200).json({
      success: true,
      message: "Google Login Successful",
      user,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default googleLogin;
