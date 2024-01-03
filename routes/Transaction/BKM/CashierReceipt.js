import express from 'express'
import { createCashierReceipt, getAllCashierReceiptH, updateCashierReceipt, getCashierReceiptUpdate, printCashierReceipt } from '../../../controllers/Transaction/BKM/CashierReceipt.js'

const router = express.Router();

router.get('/cashierreceipt/:id', getCashierReceiptUpdate);
router.post('/cashierreceipt', createCashierReceipt);
router.post('/cashierreceipt/:id', createCashierReceipt);
router.get('/cashierreceipt', getAllCashierReceiptH);
router.patch('/cashierreceiptprint/:id', printCashierReceipt);
router.patch('/cashierreceipt/:id', updateCashierReceipt);

export default router;
