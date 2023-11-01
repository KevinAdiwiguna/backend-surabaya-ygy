import express from "express";
import { createRequestList, getRequestListDetail, updateRequestList, getRequestListPrinted, getRequestListUsed, getAllRequestList, getDetailDocNo } from '../../../../controllers/Transaction/Account Receivable/AR_RequestList/AR_RequestList.js'
const router = express.Router();

router.get('/arrequestlist', getRequestListDetail);
router.post('/arrequestlist', createRequestList);
router.get('/arrequestlistp', getRequestListPrinted);
router.get('/arrequestlistu', getRequestListUsed);
router.patch('/arrequestlist/:id', updateRequestList);
router.get('/allrequestlist', getAllRequestList);
router.get('/requestlistdetail/:id', getDetailDocNo)

export default router;