import express from "express";
import { createPriceModel, deletePriceModel, getAllPriceModel, getPriceById } from '../../../controllers/Master/Customer/MasterPricelistType.js'

const router = express.Router();

router.get('/pricelist', getAllPriceModel);
router.post('/pricelist', createPriceModel);
router.get('/pricelist/:id', getPriceById);
router.delete('/pricelist/:id', deletePriceModel);

export default router;