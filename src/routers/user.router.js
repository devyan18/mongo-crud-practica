import { Router } from "express";
import {
  ctrlCreateNewUser,
  ctrlDeleteUser,
  ctrlFindOneUser,
  ctrlListUsers,
  ctrlUpdateUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", ctrlListUsers);
userRouter.post("/", ctrlCreateNewUser);

userRouter.get("/:userId", ctrlFindOneUser);
userRouter.patch("/:userId", ctrlUpdateUser);
userRouter.delete("/:userId", ctrlDeleteUser);

export { userRouter };
