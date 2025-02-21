import express from "express";
import dotnev from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
// import mongoose from "mongoose";
// import { string } from "prop-types";
import userRouter from "./routes/user.js"
import taskrouter from "./routes/task.js"
import {connectdb} from "./data/database.js"
import bodyParser from 'body-parser';

const app = express();
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());
// const cors = require("cors");
app.use(cors({ origin: "ht  tp://localhost:5173",   credentials: true }));

dotnev.config({
  path:"./data/config.env"
})
console.log(process.env.PORT);

connectdb(); 

app.use(express.json());

app.use("/api/v1/users", userRouter);
// app.use("/api/v1/task", taskrouter);

app.get("/", (req, res) => {
  res.send("nice working");
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

// server.timeout = 30000; // Increase timeout to 30 seconds
