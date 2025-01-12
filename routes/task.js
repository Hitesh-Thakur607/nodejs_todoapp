import express from "express";
import {
  updatetask,
  mytask,
  newtask,
  deletetask,
} from "../controllers/task.js";
import { isauthenticated } from "../middleware/auth.js"
const router = express.Router();

router.post("/new", isauthenticated, newtask);

router.get("/my", isauthenticated, mytask);

router.route("/:id").put( isauthenticated,updatetask).delete( isauthenticated,deletetask);

export default router;
