import express from "express";
import { createPrice, deletePrice, getAllPrice, getPriceByCode, updatePrice } from "../../controllers/Master/MasterPrice.js"

const router = express.Router();

import { verifyUser } from "../../middleware/AuthUser.js"

router.get('/price', getAllPrice);
router.patch('/price', updatePrice);
router.post('/price', createPrice);
router.delete('/price', deletePrice);
router.get('/price/:id', getPriceByCode);

export default router;
