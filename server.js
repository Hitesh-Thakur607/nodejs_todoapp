// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import morgan from "morgan";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(morgan("dev"));

// // Update CORS Configuration
// app.use(cors({
//   origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true, // Allow cookies
// }));

// // Example: Ensure cookies are set for cross-origin requests
// app.get("/api/v1/users/me", (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }
//   res.json({ message: "User authenticated", token });
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import dotnev from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.js"
import taskrouter from "./routes/task.js"
import {connectdb} from "./data/database.js"
import bodyParser from 'body-parser';

const app = express();
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

dotnev.config({
  path:"./data/config.env"
})
console.log(process.env.PORT);

connectdb(); 

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskrouter);

app.get("/", (req, res) => {
  res.send("nice working");
});

const PORT = process.env.PORT || 4000;

app.listen(process.env.PORT, () => {
  console.log("server is runnings on port ",process.env.PORT);
});
