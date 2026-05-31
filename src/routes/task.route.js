import { Router } from "express";
import { createTask, getAllTasks } from "../controllers/task.controllers.js";
import { verifyAdmin, veryfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", veryfiyJWT, createTask);
router.get("/", veryfiyJWT, verifyAdmin, getAllTasks);

export default router;
