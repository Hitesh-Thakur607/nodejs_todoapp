import express from "express";

// import {users} from "../models/user.js"

const router = express.Router();
import{ getAllUsers ,
    register   ,
    logindata,
    getuserdetails ,
    logout
    // ,updateuser,
    // deleteuser
    
}from "../controllers/user.js";
import { isauthenticated } from "../middleware/auth.js";
router.get("/all", getAllUsers);

router.post("/login",logindata);

router.post("/new", register);
router.get("/me",isauthenticated,getuserdetails);
router.get("/logout",logout);
// router.get("/users/:userid", getUserdetails); // Dynamic parameter :userid
// router.put("/users/:userid", updateuser);     // Dynamic parameter :userid
// router.delete("/users/:userid", deleteuser);  // Dynamic parameter :userid

export default router;
