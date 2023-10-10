import express from "express";
import { createARSettlement, getARSettlementData } from '../../../../controllers/Transaction/Account Receivable/ARSettlement/ARSettlement.js'
const router = express.Router();

router.get('/arsettlement/:id', getARSettlementData);
router.post('/arsettlement', createARSettlement);
router.get('/arsettlement',);
router.patch('/arsettlement',);

export default router;