import express from 'express'
import { createCashierReceipt, getCashierReceiptUpdate } from '../../../controllers/Transaction/BKM/CashierReceipt.js'

const router = express.Router();

router.get('/CashierReceipt/:id', getCashierReceiptUpdate);
router.post('/CashierReceipt', createCashierReceipt);
router.delete('/CashierReceipt/:id',);
router.patch('/CashierReceipt/:id',);

export default router;
