import { task } from "../models/task.js";
import errorhandler, {err} from "../middleware/error.js"
export const newtask = async (req, res, next) => {
  const { title, description } = req.body;
    console.log("Creating a new task...");
    try {
      const newTask = await task.create({
        title,
        description,
        user: req.user, // assuming req.user is populated
      });
  
      res.status(201).json({
        success: true,
        message: "Task added successfully",
        task: newTask, // Include the created task in the response
      })
    } catch (error) {
      next(error);
    }


};
export const mytask = async (req, res, next) => {
  try {
    const userid = req.user._id; // Get user ID from the request

    // Fetch all tasks for the user
    const taskData = await task.find({ user: userid });

    if (!taskData || taskData.length === 0) {
      return next(new errorhandler("No tasks found for this user", 404));
    }

    res.status(200).json({
      success: true,
      taskData, // Return all tasks
    });
  } catch (error) {
    next(error);
  }
};

export const  updatetask = async (req, res,next) => {
  try {
    const Task =await task.findById(req.params.id);
    if(!Task){
      return next(new errorhandler("Invalid id",404))
    }
    Task.isCompleted=!Task.isCompleted;
    await Task.save();
  
  res.status(200).json({
    sucess:true,
    message:"task updated"
  })
  } catch (error) {
    next(error);
  }
  // const {id} = req.params // Get user ID from the request

};
export const  deletetask = async (req, res,next) => {
  try {
    const Task =await task.findById(req.params.id);
    const {id} = req.params
    if(!Task){
      return next(new errorhandler("Invalid id",404))
    }
    await Task.deleteOne({ _id: id });
    res.status(200).json({
      sucess:true,
      message:"task deleted"
    })
  } catch (error) {
    next(error)
  }

};

