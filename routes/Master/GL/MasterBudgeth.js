import express from "express";

const router = express.Router();

import { verifyUser } from "../../../middleware/AuthUser.js";

import { getBudgeth, createBudgeth, updateBudgeth, deleteBudgeth, getBudgethByCode } from '../../../controllers/Master/GL/MasterBudgeth.js';

router.get('/budgeth', getBudgeth);
router.post('/budgeth', createBudgeth);
router.delete('/budgeth/:id/:id2/:id3', deleteBudgeth);
router.patch('/budgeth/:id/:id2/:id3', updateBudgeth);
router.get('/budgeth/:id/:id2/:id3', getBudgethByCode)

export default router;