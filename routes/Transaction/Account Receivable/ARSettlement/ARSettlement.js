import express from "express";
import { createARSettlement, getARSettlementData, getARSEttlement, deleteARSettlement } from '../../../../controllers/Transaction/Account Receivable/ARSettlement/ARSettlement.js'
const router = express.Router();

router.get('/arsettlement', getARSEttlement);
router.get('/arsettlement/:id', getARSettlementData);
router.post('/arsettlement', createARSettlement);
router.delete('/arsettlement/:id', deleteARSettlement);
router.patch('/arsettlement',);

export default router;