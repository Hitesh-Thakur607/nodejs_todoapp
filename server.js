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
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods:["GET","PUT","PUT","DELETE"],
  credentials:true,
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


app.listen(process.env.PORT, () => {
  console.log("server is runnings on port ",process.env.PORT);
});
