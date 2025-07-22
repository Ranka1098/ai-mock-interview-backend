import userModel from "../../model/user.js";

const profile = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).send("user not found");
    }

    res.status(200).send({ message: "profile", user: user });
  } catch (error) {
    res
      .status(500)
      .send({ message: "failed to get profile", error: error.message });
  }
};

export default profile;
