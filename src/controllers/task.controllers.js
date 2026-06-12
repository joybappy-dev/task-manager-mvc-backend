import mongoose from "mongoose";
import Task from "../models/tasks.model.js";

// create new task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const newTask = {
      title,
      description,
      priority,
      createdBy: req.user.userId,
    };

    const createdTask = await Task.create(newTask);
    res.status(201).json({
      success: true,
      postId: createdTask._id,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// get all tasks
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get single task by id
export const getSingleTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const validId = mongoose.Types.ObjectId.isValid(taskId);
    if (!validId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task Id",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// update task by id
export const updateTask = async (req, res) => {
  try {
    const update = req.body;
    const taskId = req.params.id;

    const isValidId = mongoose.Types.ObjectId.isValid(taskId);
    if (!isValidId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task Id",
      });
    }

    // find the task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }

    // check if requested user is the creator of the task
    const isCreator = task.createdBy.toString() === req.user?.userId.toString();
    const isAdmin = req.user?.userRole === "admin";

    if (!isCreator && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden access",
      });
    }

    // overwrite update and save
    Object.assign(task, update);
    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete a task by id
export const deleteATask = async (req, res) => {
  try {
    // validate id
    const taskId = req.params.id;
    const isValid = mongoose.Types.ObjectId.isValid(taskId);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid TaskId",
      });
    }

    // find task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const isAdmin = req.user.userRole.toString() === "admin";
    const isCreator = req.user.userId.toString() === task.createdBy.toString();

    if (!isAdmin && !isCreator) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this task",
      });
    }

    // db.tasks.deleteOne({ _id: ObjectId("the_tasks_id_here") })
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
};

// filter task by status
export const filterTasksByStatus = async (req, res) => {
  try {
    const VALID_STATUSES = ["pending", "in-progress", "completed"];
    const { status } = req.query;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or missing status. Must be one of: pending, in-progress, completed",
      });
    }

    const tasks = await Task.find({ status });

    return res.status(200).json({ success: true, tasks });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
};

// search task by name
export const searchTask = async (req, res) => {
  try {
    const query = req.query.search;
    const allTasks = await Task.find();
    const filtered = allTasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase()),
    );

    res.status(200).json({
      success: true,
      tasks: filtered,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
};
