import express from 'express'
import { getAllpurchaseReturnH, getpurchaseReturnByCode, createPurchaseReturnH, updatePurchaseReturnH, deletePurchaseReturnH } from '../../../controllers/Transaction/Purchase/PurchaseReturnHeader.js'

const router = express.Router();

router.get('/purchasereturnh', getAllpurchaseReturnH);
router.post('/purchasereturnh', createPurchaseReturnH);
router.delete('/purchasereturnh/:id', deletePurchaseReturnH);
router.patch('/purchasereturnh/:id', updatePurchaseReturnH);

export default router;
