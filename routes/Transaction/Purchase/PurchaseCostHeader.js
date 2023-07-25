import express from 'express'
import { getAllpurchaseCostHeader, getPurchaseCostByCode, createPurchaseCostH, deletePurchaseCostHeader, updatePurchaseCostH } from '../../../controllers/Transaction/Purchase/PurchaseCostHeader.js'

const router = express.Router();

router.get('/purchasecosth', getAllpurchaseCostHeader);
router.post('/purchasecosth', createPurchaseCostH);
router.delete('/purchasecost/:id', deletePurchaseCostHeader);
router.patch('/purchasecosth/:id', updatePurchaseCostH);

export default router;
