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
      message: createdTask._id,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
