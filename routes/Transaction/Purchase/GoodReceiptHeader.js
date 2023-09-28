import express from 'express'
import { getAllgoodReceipt, getGoodReceiptDetail, createPurchaseCostH, updateGoodReceiptH, deleteGoodReceiptH } from '../../../controllers/Transaction/Purchase/GoodReceiptHeader.js'

const router = express.Router();

router.get('/goodsreceipth', getAllgoodReceipt);
router.get('/goodsreceiptdetail/:id', getGoodReceiptDetail);
router.post('/goodsreceipth', createPurchaseCostH);
router.delete('/goodsreceipth/:id', deleteGoodReceiptH);
router.patch('/goodsreceipth/:id', updateGoodReceiptH);

export default router;
