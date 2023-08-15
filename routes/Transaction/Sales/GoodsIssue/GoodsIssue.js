import express from 'express'
import { getGoodsIssue,createGoodsIssue } from '../../../../controllers/Transaction/Sales/GoodsIssue/GoodIssue.js'

const router = express.Router()

router.get('/goodsissue/:id', getGoodsIssue)
router.post('/goodsissue', createGoodsIssue)


export default router
