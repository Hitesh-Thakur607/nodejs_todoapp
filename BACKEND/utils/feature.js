import jwt from "jsonwebtoken";

export const sendcookie = (user, res, message, statusCode = 200) => {
  const secretKey = process.env.JWT_SECRET || "default_secret_key";
  const token = jwt.sign({ _id: user._id }, secretKey, {
    expiresIn: "1h",  // You can adjust the expiration time as needed (e.g., 1 hour)
  });

  // Ensure statusCode is used consistently and maxAge is correct
  res
    .status(statusCode)  // Use statusCode passed to the function
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,  // Token expiration (15 minutes)
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true, // Set secure cookie only in production
    })
    .json({
      success: true,  // Use 'true' instead of a string for success status
      message,
    });
};
