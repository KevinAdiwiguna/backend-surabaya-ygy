import express from "express";
import { getAllSalesOrderDetail,updateSalesOrderDetail,createSalesORderDetail } from '../../../../controllers/Transaction/Sales/SalesOrder/SalesOrderDetail.js'

const router = express.Router();

router.get('/salesorderd/:id', getAllSalesOrderDetail);
router.patch('/salesorderd/:id1/:id2', updateSalesOrderDetail);
router.patch('/salesorderd/:id', createSalesORderDetail);
// router.patch('/salesorderd/:id', updateSalesOrderDetail);

export default router;