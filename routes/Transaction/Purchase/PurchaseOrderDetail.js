import express from 'express'
import { getAllpurchaseOrderDetail, getPurchaseOrderByCode, deletePurchaseOrderDetail, updatePurchaseRequest, createPurchaseOrderD } from '../../../controllers/Transaction/Purchase/PurchaseOrderDetail.js'

const router = express.Router();

router.get('/purchaseorderh', getAllpurchaseOrderDetail);
router.post('/purchaseorderh', createPurchaseOrderD);
router.delete('/purchaseorderh/:id', deletePurchaseOrderDetail);
router.patch('/purchaseorderh/:id', updatePurchaseRequest);

export default router;
