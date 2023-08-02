import express from 'express'
import { getGoodsIssue } from '../../../../controllers/Transaction/Sales/GoodsIssue/GoodIssue.js'

const router = express.Router()

router.get('/goodsissue/:id', getGoodsIssue)


export default router
