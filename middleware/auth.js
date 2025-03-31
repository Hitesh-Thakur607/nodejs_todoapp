import { users } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isauthenticated = async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please log in first",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");

    // Find user by ID
    const user = await users.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach user to request object
    req.user = user;
    next();

  } catch (error) {
    console.error("Authentication Error:", error.message);

    return res.status(401).json({
      success: false,
      message: error.message.includes('jwt expired')
        ? "Session expired. Please log in again."
        : "Unauthorized: Invalid token",
    });
  }
};
// import { users } from "../models/user.js"
// import jwt from "jsonwebtoken"
// export const isauthenticated=async(req,res,next)=>{
//       const token = req.cookies.token;
    
//       if (!token) {
//         return res.status(401).json({
//           success: false,
//           message: "Please log in first",
//         });
//       }
    
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
//         req.user = await users.findById(decoded._id);
//       next();
//         // if (!user) {
//         //   return res.status(404).json({
//         //     success: false,
//         //     message: "User not found",
//         //   });
//         // }
    
//         // res.status(200).json({
//         //   success: true,
//         //   user,
//         // });
// }
