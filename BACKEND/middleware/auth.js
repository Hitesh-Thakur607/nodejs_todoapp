
import { users } from "../models/user.js"
import jwt from "jsonwebtoken"
export const isauthenticated = async (req, res, next) => {
  try {
    // Check token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please log in first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
    req.user = await users.findById(decoded._id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};
