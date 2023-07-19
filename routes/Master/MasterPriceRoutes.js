import express from "express";
// import { createPrice, deletePrice, getAllPrice, getPricebyCode, updatePrice } from "../../controllers/Master/MasterPrice.js"

import { createPrice, deletePrice, getAllPrice, getPricebyCode, updatePrice } from "../../controllers/Master/MasterPrice.js"


const router = express.Router();

import { verifyUser } from "../../middleware/AuthUser.js"

router.get('/price', verifyUser, getAllPrice);
router.patch('/price/:id', verifyUser, updatePrice);
router.post('/price', verifyUser, createPrice);
router.delete('/price/:id',  deletePrice);
router.get('/price/:id', verifyUser, getPricebyCode);

export default router;
