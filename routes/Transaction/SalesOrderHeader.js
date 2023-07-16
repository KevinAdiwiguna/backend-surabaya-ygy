import express from "express";
import { createSalesOrderHeader, getAllSalesOrderHeader, deleteSalesOrderHeader, updateSalesOrderHeader,getSalesOrderByCode } from '../../controllers/Transaction/SalesOrderHeader.js'

const router = express.Router();

router.get('/salesorderh', getAllSalesOrderHeader);
router.post('/salesorderh', createSalesOrderHeader);
router.get('/salesorderh/:id', getSalesOrderByCode);
router.patch('/salesorderh/:id', updateSalesOrderHeader);
router.delete('/salesorderh/:id', deleteSalesOrderHeader);

export default router;