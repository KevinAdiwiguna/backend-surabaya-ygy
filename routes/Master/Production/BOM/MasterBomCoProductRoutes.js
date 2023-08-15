import express from "express";

const router = express.Router();

import { getAllBomcoProduct, createBomcoProduct, deleteBomcoProduct, getBomcoProductByCode, updateBomcoProduct } from "../../../../controllers/Master/Production/BOM/MasterBomCoProduct.js"

import { verifyUser } from "../../../../middleware/AuthUser.js";

router.get('/bomcp', verifyUser, getAllBomcoProduct);
router.post('/bomcp', verifyUser, createBomcoProduct);
router.delete('/bomcp/:id/:id2', verifyUser, deleteBomcoProduct);
router.get('/bomcp/:id/:id2', verifyUser, getBomcoProductByCode);
router.patch('/bomcp/:id/:id2', verifyUser, updateBomcoProduct);

export default router;