import { Router } from "express";
import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/auth.controllers.js";
import { verifyAdmin, veryfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", veryfiyJWT, verifyAdmin, getUsers);

export default router;
