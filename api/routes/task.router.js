const express = require("express");

const {
  getTasks,
  createTask,
  // updateTask,
  // deleteTask,
} = require("../controller/task.controller");

const taskRouter = express.Router();

taskRouter.get("/", getTasks);
taskRouter.post("/create", createTask);
// taskRouter.put("/update/:id", updateTask);
// taskRouter.delete("/delete/:id", deleteTask);

module.exports = taskRouter;
