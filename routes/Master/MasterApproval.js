import express from "express";

const router = express.Router();

import { verifyUser } from "../../middleware/AuthUser.js";
import {createMasterApproval,getAllMasterApproval} from '../../controllers/Master/MasterApproval.js'

router.get('/approval', verifyUser, getAllMasterApproval);
router.post('/approval', verifyUser, createMasterApproval);

export default router;