import express from 'express'
import { getAllgoodReceiptd, getGoodReceiptByCode, createGoodReceiptD, updategoodReceiptD, deletegoodReceiptd } from '../../../controllers/Transaction/Purchase/GoodReceiptDetail.js'

const router = express.Router();

router.get('/goodsreceiptd', getAllgoodReceiptd);
router.get('/goodsreceiptd/:id', getGoodReceiptByCode)
router.post('/goodsreceiptd', createGoodReceiptD);
router.delete('/goodsreceiptd/:id', deletegoodReceiptd);
router.patch('/goodsreceiptd/:id', updategoodReceiptD);

export default router;
