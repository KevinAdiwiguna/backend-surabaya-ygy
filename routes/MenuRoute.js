import express from "express";

const router = express.Router();
import { createMenuModel, getMenuModel } from '../controllers/Menu.js'
import { verify } from "argon2";
import { adminOnly } from "../middleware/AuthUser.js";
router.get('/menu', verify, getMenuModel);
router.post('/menu', verify, createMenuModel);
// router.delete('/logout', logOut);

export default router;