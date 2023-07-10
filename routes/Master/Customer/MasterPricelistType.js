import express from "express";
import { createPriceModel, deletePriceModel, getAllPriceModel, getPriceById, updatePriceModel } from '../../../controllers/Master/Customer/MasterPricelistType.js'

const router = express.Router();

import { verifyUser, adminOnly } from "../../../middleware/AuthUser.js"

router.get('/pricelist', verifyUser, getAllPriceModel);
router.patch('/pricelist', verifyUser, updatePriceModel);
router.post('/pricelist', verifyUser, createPriceModel);
router.get('/pricelist/:id', verifyUser, getPriceById);
router.delete('/pricelist/:id', verifyUser, deletePriceModel);

export default router;