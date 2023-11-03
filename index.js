import express from "express";
import cors from "cors";
import morgan from "morgan";

import { config } from "./src/settings/config.js";
import { startConnection } from "./src/settings/database.js";

import { userRouter } from "./src/routers/user.router.js";
import { taskRouter } from "./src/routers/task.router.js";
import { aggregateProduct } from "./src/models/product.model.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(config.port, async () => {
  await startConnection();

  await aggregateProduct();

  console.log(`Server running on port ${config.port}`);
});
