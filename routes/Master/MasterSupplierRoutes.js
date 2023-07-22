import express from "express";
import { createSupplier, deleteSupplier, getAllSupplier, getSupplierByCode, updateSupplier } from "../../controllers/Master/MasterSupplier.js";

const router = express.Router();

import { verifyUser } from "../../middleware/AuthUser.js";

router.get('/supplier', getAllSupplier);
router.patch('/supplier/:id', updateSupplier);
router.post('/supplier', createSupplier);
router.delete('/supplier/:id', deleteSupplier);
router.get('/supplier/:id', getSupplierByCode);

export default router;


