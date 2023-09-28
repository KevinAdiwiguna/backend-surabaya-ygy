import express from "express";
import { getCustomerPaymentDetail } from '../../../../controllers/Transaction/Account Receivable/CustomerPayment/CustomerPayment.js'
const router = express.Router();

router.get('/customerpaymentd/:id', getCustomerPaymentDetail);
// router.post('/arrequestlist', createRequestList);
// router.patch('/arrequestlist/:id', updateRequestList);

export default router;