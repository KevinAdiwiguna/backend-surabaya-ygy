import express from "express";
import { getDebtPaymentDetail, createDebtPayment } from '../../../controllers/Transaction/AP/DebtPayment.js'
const router = express.Router();

router.get('/debtpayment/:id', getDebtPaymentDetail);
router.post('/debtpayment', createDebtPayment);
// router.patch('/arrequestlist/:id', updateRequestList);

export default router;