import express from "express";

const router = express.Router();

import { getAllDownTimeReason, createDownTimeReason, deleteDownTimeReason, getDownTimeReasonByCode, updateDownTimeReason} from "../../../controllers/Master/Production/MasterDownTimeReason.js";

import { verifyUser } from "../../../middleware/AuthUser.js";

router.get('/downtr', verifyUser, getAllDownTimeReason);
router.post('/downtr', verifyUser, createDownTimeReason);
router.delete('/downtr/:id', verifyUser, deleteDownTimeReason);
router.patch('/downtr/:id', verifyUser, updateDownTimeReason);
router.get('/downtr/:id', verifyUser, getDownTimeReasonByCode);

export default router;
