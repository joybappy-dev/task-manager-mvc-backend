import { Router } from "express";
import {
  createTask,
  deleteATask,
  filterTasksByStatus,
  getAllTasks,
  getSingleTask,
  searchTask,
  updateTask,
} from "../controllers/task.controllers.js";
import { verifyAdmin, veryfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// create task
router.post("/", veryfiyJWT, createTask);

// get all tasks
router.get("/", veryfiyJWT, verifyAdmin, getAllTasks);

// search task by title
router.get("/search", searchTask);

// filter tasks by status
router.get("/filter/status", filterTasksByStatus);

// get single task by id
router.get("/:id", veryfiyJWT, getSingleTask);

// update task by id
router.patch("/:id", veryfiyJWT, updateTask);

// delete task by id
router.delete("/:id", veryfiyJWT, deleteATask);

export default router;
