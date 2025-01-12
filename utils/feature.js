import jwt from "jsonwebtoken";
export const sendcookie = (user, res, message, statusCode = 200) => {
  const secretKey = process.env.JWT_SECRET || "default_secret_key";
  const token = jwt.sign({ _id: user._id }, secretKey);
  

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 10000,
      samesite:process.env.NODE_ENV==="DEVELOPMENT"?"lax":"none",
      secure:process.env.NODE_ENV==="DEVELOPMENT"?false:true
    })
    .json({
      sucess: "true",
      message
    });
};
