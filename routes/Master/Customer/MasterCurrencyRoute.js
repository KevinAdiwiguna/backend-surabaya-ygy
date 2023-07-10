import express from "express";
import { createCurrency, deleteCurrency, getCurrency, getCurrencyById, updateCurrency } from '../../../controllers/Master/MasterCurrency.js'

const router = express.Router();

import { verifyUser, adminOnly } from "../../../middleware/AuthUser.js"

router.get('/currency', verifyUser, getCurrency);
router.patch('/currency', verifyUser, updateCurrency);
router.post('/currency', verifyUser, createCurrency);
router.delete('/currency/:id', verifyUser, deleteCurrency);
router.get('/currency/:id', verifyUser, getCurrencyById);

export default router;