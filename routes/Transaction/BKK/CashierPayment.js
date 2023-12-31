import express from 'express'
import { getCashierPaymentUpdate, createCashierPayment, getAllCashierPaymentUpdate, printCashierPayment } from '../../../controllers/Transaction/BKK/CashierPayment.js'

const router = express.Router();

router.get('/cashierpayment', getAllCashierPaymentUpdate);
router.get('/cashierpayment/:id', getCashierPaymentUpdate);
router.post('/cashierrpayment', createCashierPayment);
router.delete('/cashierpayment/:id',);
router.patch('/cashierpaymentprint/:id', printCashierPayment);

export default router;
