import express from "express";
import { createSalesOrderDetail, deleteSalesOrderDetail, getAllSalesOrderDetail, updateSalesOrderDetail } from '../../controllers/Transaction/SalesOrderDetail.js'

const router = express.Router();

router.get('/salesorderd', getAllSalesOrderDetail);
router.post('/salesorderd', createSalesOrderDetail);
router.delete('/salesorderd/:id', deleteSalesOrderDetail);
router.patch('/salesorderd/:id', updateSalesOrderDetail);

export default router;