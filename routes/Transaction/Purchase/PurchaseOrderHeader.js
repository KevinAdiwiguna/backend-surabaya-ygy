import express from 'express'
import { getAllpurchaseOrderHeader, printInvoice, getPurchaseRequestByCode, approvePurchaseOrder, deletePurchaseOrderHeader, updatePurchaseRequest, createPurchaseRequestH, getPurchaseOrderByPrinted } from '../../../controllers/Transaction/Purchase/PurhaseOrderHeader.js'

const router = express.Router();

router.get('/purchaseorderh', getAllpurchaseOrderHeader);
router.patch('/purchaseorderprint/:id', printInvoice);
router.get('/purchaseorderh/PRINTED', getPurchaseOrderByPrinted);
router.get('/purchaseorderh/:id', getPurchaseRequestByCode);
router.patch('/purchaseorderhapprove/:id/:id2/:id3/:id4/:id5', approvePurchaseOrder);
router.post('/purchaseorderh', createPurchaseRequestH);
router.delete('/purchaseorderh/:id', deletePurchaseOrderHeader);
router.patch('/purchaseorderh/:id', updatePurchaseRequest);

export default router;
