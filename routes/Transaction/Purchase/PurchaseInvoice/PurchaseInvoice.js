import express from 'express'
import { getPurchaseDetail, createPurchase, getAllPurchaseInvoice, deleteInvoice, printPurchaseInvoice, getPurchaseInvoiceByCode, updatePurchaseInvoice } from '../../../../controllers/Transaction/Purchase/PurchaseInvoice/PurchaseInvoice.js'

const router = express.Router();

router.get('/purchaseinvoicedetail/:id', getPurchaseDetail);
router.get('/purchaseinvoice/:id', getPurchaseInvoiceByCode);
router.post('/purchaseinvoice', createPurchase);
router.get('/purchaseinvoice', getAllPurchaseInvoice)
router.patch('/purchaseinvoice/:id', updatePurchaseInvoice);
router.patch('purchaseinvoiceprint/:id', printPurchaseInvoice)
router.delete('/purchaseinvoice/:id', deleteInvoice);

export default router;
