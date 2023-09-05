import express from "express";
import { getSuppPart, createSuppPart, deleteSuppPart, getSuppPartByCode } from "../../controllers/Master/MasterSupplierPartner.js";

const router = express.Router();

import { verifyUser } from "../../middleware/AuthUser.js";

router.get('/suppartner', getSuppPart);
router.post('/suppartner', createSuppPart);
router.delete('/suppartner', deleteSuppPart);
router.get('/suppartner/:id', getSuppPartByCode);

export default router;