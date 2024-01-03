import express from 'express'
import { getAllpurchaseCostD, getPurchaseRequestByCode, createPurchaseCostD, deletePurchaseCostd, updatePurchaseRequest} from '../../../controllers/Transaction/Purchase/PurchaseCostDetail.js'

const router = express.Router();

router.get('/purchasecostd', getAllpurchaseCostD);
router.post('/purchasecostd', createPurchaseCostD);
router.delete('/purchasecostd/:id', deletePurchaseCostd);
router.patch('/purchasecostd/:id', updatePurchaseRequest);

export default router;
