import { UserModel } from "../models/user.model.js";

export const ctrlCreateNewUser = async (req, res) => {
  try {
    // const newUser = await UserModel.create(req.body);

    const newUser = new UserModel(req.body);

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const ctrlListUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find().populate("tasks", [
      "text",
      "done",
    ]);

    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const ctrlFindOneUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findOne({ _id: userId }).populate(
      "tasks",
      ["text", "done"],
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const ctrlUpdateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findOne({ _id: userId });

    user.set(req.body);

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const ctrlDeleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await UserModel.findOneAndDelete({ _id: userId });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
