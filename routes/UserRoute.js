import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
     updatePassword,
    deleteUser,
    createAdmin
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users',verifyUser, adminOnly, getUsers);
router.get('/users/:id',verifyUser,adminOnly, getUserById);
router.post('/users',verifyUser,adminOnly, createUser);
router.post('/users/admin', createAdmin);
router.patch('/users/:id',verifyUser, updatePassword);
router.delete('/users/:id',verifyUser,adminOnly, deleteUser);

export default router;