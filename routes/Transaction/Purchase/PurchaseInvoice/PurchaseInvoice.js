import express from 'express'
import { getPurchaseDetail, createPurchase, getAllPurchaseInvoice, getPurchaseInvoiceByCode } from '../../../../controllers/Transaction/Purchase/PurchaseInvoice/PurchaseInvoice.js'

const router = express.Router();

router.get('/purchaseinvoicedetail/:id', getPurchaseDetail);
router.get('/purchaseinvoice/:id', getPurchaseInvoiceByCode);
router.post('/purchaseinvoice', createPurchase);
router.get('/purchaseinvoice', getAllPurchaseInvoice)
// router.delete('/purchaseinvoice/:id', deletegoodReceiptd);
// router.patch('/purchaseinvoice/:id', updategoodReceiptD);

export default router;
