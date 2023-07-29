import express from 'express'
// import { getAllpurchaseRequestd, getPurchaseRequestByCode, updatePurchaseRequest, createPurchaseRequestD, deletePurchaseRequestd  } from '../../../controllers/Transaction/Purchase/PurchaseRequestDetail.js'
// import { createPurchaseRequestD, deletePurchaseRequestd, getAllpurchaseRequestd, getPurchaseRequestByCode, updatePurchaseRequest } from '../../../controllers/'
import { createPurchaseRequestD, deletePurchaseRequestd, getAllpurchaseRequestd, getPurchaseRequestByCode, updatePurchaseRequest } from '../../../controllers/Transaction/Purchase/PurchaseRequestDetail.js'

const router = express.Router();

router.get('/purchaserequestd', getAllpurchaseRequestd);
router.post('/purchaserequestd/:id', createPurchaseRequestD);
router.delete('/purchaserequestd/:id', deletePurchaseRequestd);
router.patch('/purchaserequestd/:id', updatePurchaseRequest);

export default router;