const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });

  res.status(200).send({ message: "logout successfully" });
  try {
  } catch (error) {
    res.status(500).send({ message: "failed to logout", error: error.message });
  }
};

export default logout;
