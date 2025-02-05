import express from "express";
import authenticateUser from "../middleware/authenticateUser";
const router = express.Router();
import { createContent, getAllContent, updateContent, deleteContent } from "../controllers/contentController";

router.post('/create', authenticateUser, createContent);
router.get('/get', authenticateUser, getAllContent);
router.put('/id/:id', authenticateUser, updateContent);
router.delete('/id/:id', authenticateUser, deleteContent);

export default router;