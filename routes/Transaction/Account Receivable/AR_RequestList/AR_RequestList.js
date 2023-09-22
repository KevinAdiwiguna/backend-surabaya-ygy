import express from "express";
import { createRequestList, getRequestListDetail, updateRequestList } from '../../../../controllers/Transaction/Account Receivable/AR_RequestList/AR_RequestList.js'
const router = express.Router();

router.get('/arrequestlist', getRequestListDetail);
router.post('/arrequestlist', createRequestList);
router.patch('/arrequestlist', updateRequestList);

export default router;