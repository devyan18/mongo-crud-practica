import { Schema, model, Types } from "mongoose";

const taskSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const TaskModel = model("Task", taskSchema);
