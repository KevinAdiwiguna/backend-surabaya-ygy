import express from 'express'
import { getAllpurchaseCostD, getPurchaseRequestByCode, createPurchaseCostD, deletePurchaseCostd, updatePurchaseRequest} from '../../../controllers/Transaction/Purchase/PurchaseCostDetail.js'

const router = express.Router();

router.get('/purchasecosth', getAllpurchaseCostD);
router.post('/purchasecosth', createPurchaseCostD);
router.delete('/purchasecost/:id', deletePurchaseCostd);
router.patch('/purchasecosth/:id', updatePurchaseRequest);

export default router;
