import { loginHandler, logoutHandler, refreshHandler, registerHandler } from "../auth/auth.controller.js";
import express from "express";
import { refreshMiddleware } from "../middleware/jwt.middleware.js";



const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/refresh", refreshMiddleware, refreshHandler);
router.post("/logout", refreshMiddleware, logoutHandler);

export default router;