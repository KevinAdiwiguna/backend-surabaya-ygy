import express from "express";
import { createRequestList, getRequestListDetail, updateRequestList } from '../../../../controllers/Transaction/AP/AP_ReceiptList.js'
const router = express.Router();

router.get('/apreceiptlist', getRequestListDetail);
router.post('/apreceiptlist', createRequestList);
router.patch('/apreceiptlist/:id', updateRequestList);

export default router;