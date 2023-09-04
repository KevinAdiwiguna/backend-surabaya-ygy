import express from "express";

const router = express.Router();

import { verifyUser } from "../../../middleware/AuthUser.js";

import { getCashflowd, createCashflowd, updateCashflowd, deleteCashflowd, getCashflowdByCode } from '../../../controllers/Master/GL/MasterCashflowd.js';

router.get('/cflowd', getCashflowd);
router.post('/cflowd', createCashflowd);
router.delete('/cflowd/:id/:id2/:id3', deleteCashflowd);
router.patch('/cflowd/:id/:id2/:id3', updateCashflowd);
router.get('/cflowd/:id/:id2/:id3', getCashflowdByCode)

export default router;