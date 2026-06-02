import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getSingleTask,
} from "../controllers/task.controllers.js";
import { verifyAdmin, veryfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", veryfiyJWT, createTask);
router.get("/", veryfiyJWT, verifyAdmin, getAllTasks);
router.get("/:id", getSingleTask);

export default router;
