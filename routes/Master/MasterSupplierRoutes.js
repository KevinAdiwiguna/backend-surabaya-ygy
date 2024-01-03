import express from "express";
import { createSupplier, deleteSupplier, getAllSupplier, getSupplierByCode, updateSupplier } from "../../controllers/Master/MasterSupplier.js";

const router = express.Router();

import { verifyUser } from "../../middleware/AuthUser.js";

router.get('/supplier', verifyUser, getAllSupplier);
router.patch('/supplier/:id', verifyUser, updateSupplier);
router.post('/supplier', verifyUser, createSupplier);
router.delete('/supplier/:id', verifyUser, deleteSupplier);
router.get('/supplier/:id', verifyUser, getSupplierByCode);

export default router;


