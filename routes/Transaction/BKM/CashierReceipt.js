import express from 'express'
import { createCashierReceipt, getCashierReceiptUpdate, printCashierReceipt } from '../../../controllers/Transaction/BKM/CashierReceipt.js'

const router = express.Router();

router.get('/cashierreceipt/:id', getCashierReceiptUpdate);
router.post('/cashierreceipt', createCashierReceipt);
router.delete('/cashierreceipt/:id',);
router.patch('/cashierreceiptprint/:id', printCashierReceipt);

export default router;
