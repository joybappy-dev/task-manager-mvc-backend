import { Router } from "express";
import { createTask } from "../controllers/task.controllers.js";
import { veryfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", veryfiyJWT, createTask);

export default router;