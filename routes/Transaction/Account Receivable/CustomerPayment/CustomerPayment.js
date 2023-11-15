import express from "express";
import { getCustomerPaymentDetail, createCustomerPayment, getAllCustomerPayment,getCustomerPaymentDetailByDocNo } from '../../../../controllers/Transaction/Account Receivable/CustomerPayment/CustomerPayment.js'
const router = express.Router();

router.get('/customerpaymentd/:id', getCustomerPaymentDetail);
router.get('/allcustomerpaymenth', getAllCustomerPayment);
router.post('/customerpayment', createCustomerPayment);
router.get('/customerpayment/:id', getCustomerPaymentDetailByDocNo);


export default router;