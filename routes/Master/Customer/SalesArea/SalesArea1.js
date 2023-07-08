import express from "express";
import { createSalesArea1, deleteSalesArea1, getAreaById, getSalesArea1 } from '../../../../controllers/Master/Customer/SalesArea/SalesArea1.js'

const router = express.Router();

router.get('/salesarea1', getSalesArea1);
router.post('/salesarea1', createSalesArea1);
router.delete('/salesarea1/:id', deleteSalesArea1);
router.get('/salesarea1/:id', getAreaById);

export default router;



