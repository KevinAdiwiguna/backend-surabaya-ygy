import express from 'express'
import { getAllpurchaseOrderHeader, approvePurchaseOrder, deletePurchaseOrderHeader, updatePurchaseRequest, createPurchaseRequestH } from '../../../controllers/Transaction/Purchase/PurhaseOrderHeader.js'

const router = express.Router();

router.get('/purchaseorderh', getAllpurchaseOrderHeader);
router.get('/purchaseorderhapprove', approvePurchaseOrder);
router.post('/purchaseorderh', createPurchaseRequestH);
router.delete('/purchaseorderh/:id', deletePurchaseOrderHeader);
router.patch('/purchaseorderh/:id', updatePurchaseRequest);

export default router;
