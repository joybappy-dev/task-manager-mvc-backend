import { Router } from "express";
import { createTask } from "../controllers/task.controllers.js";

const router = Router();

router.post("/", createTask);

export default router;