import express from "express";

const router = express.Router();

import { getAllBomcoProduct, createBomcoProduct, deleteBomcoProduct, getBomcoProductByCode, updateBomcoProduct } from "../../../controllers/Master/Production/MasterBomCoProduct.js"

router.get('/bomcp', getAllBomcoProduct);
router.post('/bomcp', createBomcoProduct);
router.delete('/bomcp/:id/:id2', deleteBomcoProduct);
router.get('/bomcp/:id/:id2', getBomcoProductByCode);
router.patch('/bomcp/:id/:id2', updateBomcoProduct)

export default router;