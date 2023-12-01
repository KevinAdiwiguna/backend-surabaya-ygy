import express from "express";
import { createRequestList, getRequestListDetail, getAppBok, getAPReceiptUsed, getAllAPReceipt, getCreatedApRequestList, updateRequestList } from '../../../controllers/Transaction/AP/AP_ReceiptList.js'
const router = express.Router();

router.get('/apreceiptlist/:id', getRequestListDetail);
router.post('/apreceiptlist', createRequestList);
router.get('/apreceiptlistcreated', getCreatedApRequestList);
router.patch('/apreceiptlist/:id', updateRequestList);
router.get('/apreceiptlistu', getAPReceiptUsed);
router.get('/apreceiptlist', getAllAPReceipt)
router.get('/getapbook/:id', getAppBok)

export default router;  