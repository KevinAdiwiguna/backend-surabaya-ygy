import express from "express";
import { getAllSalesOrderDetail,updateSalesOrderDetail } from '../../controllers/Transaction/SalesOrderDetail.js'

const router = express.Router();

router.get('/salesorderd/:id', getAllSalesOrderDetail);
router.patch('/salesorderd/:id1/:id2', updateSalesOrderDetail);
// router.delete('/salesorderd/:id', deleteSalesOrderDetail);
// router.patch('/salesorderd/:id', updateSalesOrderDetail);

export default router;