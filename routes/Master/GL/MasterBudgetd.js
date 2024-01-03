import express from "express";

const router = express.Router();

import { verifyUser } from "../../../middleware/AuthUser.js";

import { getBudgetd, createBudgetd, updateBudgetd, deleteBudgetd, getBudgetdByCode } from '../../../controllers/Master/GL/MasterBudgetd.js';

router.get('/budgetd', getBudgetd);
router.post('/budgetd', createBudgetd);
router.delete('/budgetd/:id/:id2/:id3', deleteBudgetd);
router.patch('/budgetd/:id/:id2/:id3', updateBudgetd);
router.get('/budgetd/:id/:id2/:id3', getBudgetdByCode)

export default router;