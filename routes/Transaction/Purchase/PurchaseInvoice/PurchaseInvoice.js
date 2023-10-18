import express from 'express'
import { getPurchaseDetail, createPurchase } from '../../../../controllers/Transaction/Purchase/PurchaseInvoice/PurchaseInvoice.js'

const router = express.Router();

router.get('/purchaseinvoicedetail/:id', getPurchaseDetail);
router.post('/purchaseinvoice', createPurchase);
// router.delete('/purchaseinvoice/:id', deletegoodReceiptd);
// router.patch('/purchaseinvoice/:id', updategoodReceiptD);

export default router;
