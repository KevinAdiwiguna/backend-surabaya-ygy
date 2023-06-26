import express from "express";
import { getCategory, createCategory } from "../controllers/Category.js";

const router = express.Router();
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";


router.get('/category', verifyUser, adminOnly, getCategory);
router.post('/category', verifyUser, adminOnly, createCategory);

export default router