import { users } from "../models/user.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { sendcookie } from "../utils/feature.js";
import errorhandler from "../middleware/error.js";
// import { users } from "../models/task.js";
export const getAllUsers = async (req, res) => {};

export const logindata = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email }).select("+password");
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        sendcookie(user, res, "login sucessfully ,$(users.name)", 201);
      } else {
        res.status(404).json({ sucess: "false", message: "Invalid password" });
      }
    } else {
      return next(new errorhandler("user doesen't exist", 404));
    }
  } catch (error) {
   next(error); 
  }

};

export const register = async (req, res,next) => {
  try {
    console.log("hi");
    const { name, email, password } = req.body;
    let user = await users.findOne({ email });
    if (user) return next(new errorhandler("user already exist", 404));
  
    const hashedPasword = await bcrypt.hash(password, 10);
  
    user = await users.create({ name, email, password: hashedPasword });
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    sendcookie(user, res, "Registered successfully ", 201);
  } catch (error) {
    next(error);
  }

};

export const getuserdetails = (req, res,next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }

  // } catch (error) {
  //   res.status(403).json({
  //     success: false,
  //     message: "Invalid token",
  //   });
};
export const logout = (req, res,next) => {
  try {
    res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      samesite:process.env.NODE_ENV==="DEVELOPMENT"?"lax":none,
      secure:process.env.NODE_ENV==="DEVELOPMENT"?false:true
    }) 
    .json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }

};

//   export const updateuser=async (req, res) => {
//     //   const {id} = req.params;
//     const {id}=req.query;
//       const user1 = await user.findById(id);
//     console.log(req.params);
//       res.json({
//         sucess: true,
//         message:"updated"
//       })
//     }

//     export const deleteuser=async (req, res) => {
//       //   const {id} = req.params;
//       const {id}=req.query;
//         const user1 = await user.findById(id);
//       console.log(req.params);
//         res.json({
//           sucess: true,
//           message:"deleted"
//         })
//       }
