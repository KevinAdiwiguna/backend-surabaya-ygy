import express from 'express'
import { getPurchaseDetail } from '../../../../controllers/Transaction/Purchase/PurchaseInvoice/PurchaseInvoice.js'

const router = express.Router();

router.get('/purchaseinvoicedetail/:id', getPurchaseDetail);
// router.post('/purchaseinvoice', createGoodReceiptD);
// router.delete('/purchaseinvoice/:id', deletegoodReceiptd);
// router.patch('/purchaseinvoice/:id', updategoodReceiptD);

export default router;
