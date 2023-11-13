import express from "express";
import { getCustomerPaymentDetail, createCustomerPayment, getAllCustomerPayment } from '../../../../controllers/Transaction/Account Receivable/CustomerPayment/CustomerPayment.js'
const router = express.Router();

router.get('/customerpaymentd/:id', getCustomerPaymentDetail);
router.get('/allcustomerpaymenth', getAllCustomerPayment);
router.post('/customerpayment', createCustomerPayment);
// router.patch('/arrequestlist/:id', updateRequestList);


export default router;