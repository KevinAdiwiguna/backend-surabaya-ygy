import express from "express";
import { createPrice, deletePrice, getAllPrice, getPriceByCode, updatePrice } from "../../controllers/Master/MasterPrice.js"

const router = express.Router();

import { verifyUser } from "../../middleware/AuthUser.js"

router.get('/price', getAllPrice);
router.patch('/price/:id', updatePrice);
router.post('/price', createPrice);
router.delete('/price/:id/:id2/:id3/:id4/:id5/:id6', deletePrice);
router.get('/price/:id', getPriceByCode);

export default router;
