import express from "express";
import { getAPSEttlement, getAPSettlementData, createAPSettlement, deleteAPSettlement } from '../../../controllers/Transaction/AP/APSettlement.js'
const router = express.Router();

router.get('/asettlement', getAPSEttlement);
router.get('/apsettlement/:id', getAPSettlementData);
router.post('/apsettlement', createAPSettlement);
router.delete('/apsettlement/:id', deleteAPSettlement);
router.patch('/apsettlement',);

export default router;