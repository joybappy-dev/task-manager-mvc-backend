import { Router } from "express";
import { createTask, getAllTasks } from "../controllers/task.controllers.js";
import { veryfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", veryfiyJWT, createTask);
router.get("/", veryfiyJWT, getAllTasks);

export default router;
