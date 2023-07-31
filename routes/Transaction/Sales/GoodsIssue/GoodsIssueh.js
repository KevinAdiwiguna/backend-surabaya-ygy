import express from 'express'
import { createGoodIssueh, getAllGoodIssueh, getGoodIssued } from '../../../../controllers/Transaction/Sales/GoodsIssue/GoodIssueh.js'

const router = express.Router()

router.get('/goodissueh', getAllGoodIssueh)
router.get('/goodissued/:id', getGoodIssued)
router.post('/goodissueh', createGoodIssueh)

export default router
