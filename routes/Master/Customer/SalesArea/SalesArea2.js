import express from "express";
import { createSalesArea2, deleteSalesArea2, getAreaById, getSalesArea2 } from '../../../../controllers/Master/Customer/SalesArea/SalesArea2.js'

const router = express.Router();

router.get('/salesarea2', getSalesArea2);
router.post('/salesarea2', createSalesArea2);
router.delete('/salesarea2/:id', deleteSalesArea2);
router.get('/salesarea2/:id', getAreaById);

export default router;


