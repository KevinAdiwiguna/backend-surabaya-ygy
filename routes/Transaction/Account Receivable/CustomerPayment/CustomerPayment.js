import express from "express";
import { getCustomerPaymentDetail, createCustomerPayment } from '../../../../controllers/Transaction/Account Receivable/CustomerPayment/CustomerPayment.js'
const router = express.Router();

router.get('/customerpaymentd/:id', getCustomerPaymentDetail);
router.post('/customerpayment', createCustomerPayment);
// router.patch('/arrequestlist/:id', updateRequestList);

export default router;