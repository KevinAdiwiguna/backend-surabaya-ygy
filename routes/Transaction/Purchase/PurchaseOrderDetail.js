import express from 'express'
import { getAllpurchaseOrderDetail, getPurchaseOrderByCode, deletePurchaseOrderDetail, updatePurchaseRequest, createPurchaseOrderD } from '../../../controllers/Transaction/Purchase/PurchaseOrderDetail.js'

const router = express.Router();

router.get('/purchaseorderd/:id', getAllpurchaseOrderDetail);
router.post('/purchaseorderd', createPurchaseOrderD);
router.delete('/purchaseorderd/:id', deletePurchaseOrderDetail);
router.patch('/purchaseorderd/:id', updatePurchaseRequest);

export default router;
