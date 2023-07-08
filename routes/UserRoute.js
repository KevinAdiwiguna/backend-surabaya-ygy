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

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.post('/users/admin', createAdmin);
router.patch('/users/:id', updatePassword);
router.delete('/users/:id', deleteUser);

export default router;