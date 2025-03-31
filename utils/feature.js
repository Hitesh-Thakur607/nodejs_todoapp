// import jwt from "jsonwebtoken";
// export const sendcookie = (user, res, message, statusCode = 200) => {
//   const secretKey = process.env.JWT_SECRET || "default_secret_key";
//   // const token = jwt.sign({ _id: user._id }, secretKey);
//   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
// // res.cookie("token", token, {
// //   httpOnly: true,
// //   maxAge: 15 * 60 * 1000,
// //   sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "Lax" : "None",
// //   secure: process.env.NODE_ENV !== "DEVELOPMENT",
// // });

//   res
//     .status(201)
//     .cookie("token", token, {
//       httpOnly: true,
//       maxAge: 15 * 60 * 10000,
//       samesite:process.env.NODE_ENV==="DEVELOPMENT"?"lax":"none",
//       secure:process.env.NODE_ENV==="DEVELOPMENT"?false:true
//     })
//     .json({
//       sucess: "true",
//       message
//     });
// };
import jwt from "jsonwebtoken";

export const sendcookie = (user, res, message, statusCode = 200) => {
  const secretKey = process.env.JWT_SECRET || "default_secret_key";

  // Ensure JWT_SECRET is properly used
  if (!secretKey) {
    console.error("JWT_SECRET is missing. Check your environment variables.");
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }

  // Generate token
  const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "15m" });

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "Lax" : "None",
    secure: process.env.NODE_ENV !== "DEVELOPMENT",
  });

  // Send response
  res.status(statusCode).json({
    success: true,
    message,
    token, // Optional for debugging
  });
};
