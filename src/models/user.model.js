import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  // tasks: [
  //   {
  //     text: {
  //       type: String,
  //       required: true,
  //     },
  //     done: {
  //       type: Boolean,
  //       default: false,
  //     },
  //   },
  // ],
  tasks: [
    {
      type: Types.ObjectId,
      ref: "Task",
    },
  ],
});

export const UserModel = model("User", userSchema);
