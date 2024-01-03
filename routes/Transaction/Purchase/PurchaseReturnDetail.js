import express from 'express'
import { getAllpurchaseReturnd, getPurchaseReturnByCode, deletepurchaseReturnd, createpurchaseReturnD, updatepurchaseReturnD } from '../../../controllers/Transaction/Purchase/PurchaseReturnDetail.js'

const router = express.Router();

router.get('/purchasereturnd', getAllpurchaseReturnd);
router.post('/purchasereturnd', createpurchaseReturnD);
router.delete('/purchasereturnd/:id', deletepurchaseReturnd);
router.patch('/purchasereturnd/:id', updatepurchaseReturnD);

export default router;
