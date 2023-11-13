import express from 'express'
import { createPurchaseRequestH, deletePurchaseRequesth, getAllpurchaseRequesth, updatePurchaseRequest } from '../../../controllers/Transaction/Purchase/PurchaseRequestHeader.js'

const router = express.Router();

router.get('/purchaserequesth', getAllpurchaseRequesth);
router.post('/purchaserequesth', createPurchaseRequestH);
router.delete('/purchaserequesth/:id', deletePurchaseRequesth);
router.patch('/purchaserequest/:id', updatePurchaseRequest);

export default router;