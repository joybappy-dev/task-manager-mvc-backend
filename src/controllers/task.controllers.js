import Task from "../models/tasks.model.js";

// create new task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, createdBy } = req.body;

    const newTask = {
      title,
      description,
      priority,
      createdBy,
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
