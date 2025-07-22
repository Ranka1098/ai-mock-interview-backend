import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  const SECRET_KEY = process.env.SECRET_KEY;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, Token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;
