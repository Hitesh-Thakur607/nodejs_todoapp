  import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Path `title` is required"], // Custom error message
      },
      description: {
        type: String,
        default: "", // Optional field with a default value
      },
      isCompleted: {
        type: Boolean,
        default: false, // Default value for the field
      },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  createdate:{
    type:Date,
    required:true,
    default:Date.now
  }
});
export const task=mongoose.model("task",schema);