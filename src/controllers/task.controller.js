import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

export const ctrlListTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({}).populate("user", [
      "username",
      "email",
    ]);

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const ctrlCreateTask = async (req, res) => {
  try {
    //const newUser = await TaskModel.create()

    const user = await UserModel.findById(req.body.user);

    if (!user) return res.sendStatus(404);

    const newTask = new TaskModel(req.body);

    await newTask.save();

    // await user.updateOne({ $push : { tasks: newTask._id }});

    user.tasks.push(newTask._id);

    await user.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const ctrlDeleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await TaskModel.findById(taskId);

    if (!task) return res.sendStatus(404);

    const user = await UserModel.findById(task.user);

    await task.deleteOne();

    await user.updateOne({ $pull: { tasks: task._id } });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
