import express from 'express'
import { getAllpurchaseRequesth, getPurchaseRequestByCode, updatePurchaseRequest, createPurchaseRequestH, deletePurchaseRequesth } from '../../controllers/Transaction/Purchase/PurchaseRequesrHeader.js'

const router = express.Router();

router.get('/purchaserequesth', getAllpurchaseRequesth);
router.post('/purchaserequesth', createPurchaseRequestH);
router.delete('/purchaserequesth/:id', deletePurchaseRequesth);
router.patch('/purchaserequesth/:id', updatePurchaseRequest);

export default router;