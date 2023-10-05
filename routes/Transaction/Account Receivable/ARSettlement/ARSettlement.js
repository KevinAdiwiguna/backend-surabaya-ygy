import express from "express";
import { createARSettlement } from '../../../../controllers/Transaction/Account Receivable/ARSettlement/ARSettlement.js'
const router = express.Router();

router.get('/arsettlement',);
router.post('/arsettlement', createARSettlement);
router.get('/arsettlement', );
router.patch('/arsettlement',);

export default router;