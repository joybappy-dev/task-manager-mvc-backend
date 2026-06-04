import { Router } from "express";
import {
  createTask,
  deleteATask,
  getAllTasks,
  getSingleTask,
  updateTask,
} from "../controllers/task.controllers.js";
import { verifyAdmin, veryfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// create task
router.post("/", veryfiyJWT, createTask);

// get all tasks
router.get("/", veryfiyJWT, verifyAdmin, getAllTasks);

// get single task by id
router.get("/:id", veryfiyJWT, getSingleTask);

// update task by id
router.patch("/:id", veryfiyJWT, verifyAdmin, updateTask);

// delete task by id
router.delete("/:id", veryfiyJWT, verifyAdmin, deleteATask);

export default router;
