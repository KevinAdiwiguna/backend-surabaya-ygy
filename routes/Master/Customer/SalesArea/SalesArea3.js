import express from "express";
import { createSalesArea3, deleteSalesArea3, getAreaById, getSalesArea3 } from '../../../../controllers/Master/Customer/SalesArea/SalesArea3.js';

const router = express.Router();

router.get('/salesarea3', getSalesArea3);
router.post('/salesarea3', createSalesArea3);
router.delete('/salesarea3/:id', deleteSalesArea3);
router.get('/salesarea3/:id', getAreaById);


export default router