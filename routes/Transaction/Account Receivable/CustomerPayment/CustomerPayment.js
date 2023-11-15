import express from "express";
import { getCustomerPaymentDetail,updateCustomerPayment, createCustomerPayment, getAllCustomerPayment,getCustomerPaymentDetailByDocNo } from '../../../../controllers/Transaction/Account Receivable/CustomerPayment/CustomerPayment.js'
const router = express.Router();

router.get('/customerpaymentd/:id', getCustomerPaymentDetail);
router.get('/allcustomerpaymenth', getAllCustomerPayment);
router.post('/customerpayment', createCustomerPayment);
router.get('/customerpayment/:id', getCustomerPaymentDetailByDocNo);
router.patch('/customerpayment/:id', updateCustomerPayment)


export default router;