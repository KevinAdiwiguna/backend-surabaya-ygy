import express from 'express'
import { createPurchaseRequestH, deletePurchaseRequesth, getAllpurchaseRequesth, getPurchaseRequestByCode, updatePurchaseRequest } from '../../../controllers/Transaction/Purchase/PurchaseRequestHeader.js'

const router = express.Router();

router.get('/purchaserequesth', getAllpurchaseRequesth);
router.post('/purchaserequesth', createPurchaseRequestH);
router.delete('/purchaserequesth/:id', deletePurchaseRequesth);
router.patch('/purchaserequesth/:id', updatePurchaseRequest);

export default router;