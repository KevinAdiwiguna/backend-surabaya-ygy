import express from "express";
import { createPrice, deletePrice, getAllPrice, getPricebyCode, updatePrice } from "../../controllers/Master/MasterPrice.js"

const router = express.Router();

import { verifyUser } from "../../middleware/AuthUser.js"

router.get('/price', verifyUser, getAllPrice);
router.patch('/price', verifyUser, updatePrice);
router.post('/price', verifyUser, createPrice);
router.delete('/price', verifyUser, deletePrice);
router.get('/price', verifyUser, getPricebyCode);

export default router;
