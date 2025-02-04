import express from "express";
import { signinHandler, signupHandler } from "../controllers/authController";
const router = express.Router();

router.post("/signup", signupHandler);
router.post("/signin", signinHandler);

export default router;