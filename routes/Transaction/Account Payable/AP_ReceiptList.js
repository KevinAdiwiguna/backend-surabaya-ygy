import express from "express";
import { createRequestList, getRequestListDetail, getCreatedApRequestList, updateRequestList } from '../../../controllers/Transaction/AP/AP_ReceiptList.js'
const router = express.Router();

router.get('/apreceiptlist/:id', getRequestListDetail);
router.post('/apreceiptlist', createRequestList);
router.get('/apreceiptlistcreated', getCreatedApRequestList);
router.patch('/apreceiptlist/:id', updateRequestList);

export default router;