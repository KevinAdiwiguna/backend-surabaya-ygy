import express from "express";
import { createCurrency, deleteCurrency, getCurrency, getCurrencyById } from '../../../controllers/Master/MasterCurrency.js'

const router = express.Router();

router.get('/currency', getCurrency);
router.post('/currency', createCurrency);
router.delete('/currency/:id', deleteCurrency);
router.get('/currency/:id', getCurrencyById);

export default router;