import express from 'express'

const router = express.Router()

import { verifyUser } from '../../middleware/AuthUser.js'
import { closePeriode, createPeriode } from '../../controllers/Master/MasterPeriode.js'

router.delete('/periode/:id', verifyUser, closePeriode)
router.post('/periode', verifyUser, createPeriode)

export default router
