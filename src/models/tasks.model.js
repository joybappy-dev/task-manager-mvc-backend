const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    priority: {
      type: Boolean,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: true,
  },
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
