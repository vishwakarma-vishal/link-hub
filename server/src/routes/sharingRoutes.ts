import express from "express";
import { getUserData, toggleSharing } from "../controllers/sharingController";
import authenticateUser from "../middleware/authenticateUser";
const router = express.Router();

router.post("/toggle", authenticateUser, toggleSharing);
router.get("/content", getUserData);

export default router;

