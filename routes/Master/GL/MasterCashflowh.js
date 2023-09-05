import express from "express";

const router = express.Router();

import { verifyUser } from "../../../middleware/AuthUser.js";

import { getCashflowh, createCashflowh, updateCashflowh, deleteCashflowh, getCashflowhByCode } from '../../../controllers/Master/GL/MasterCashflowh.js';

router.get('/cflowh', getCashflowh);
router.post('/cflowh', createCashflowh);
router.delete('/cflowh/:id/:id2', deleteCashflowh);
router.patch('/cflowh/:id/:id2', updateCashflowh);
router.get('/cflowh/:id/:id2', getCashflowhByCode)

export default router;