import express from "express";
import { getAllGenerateTaxNo, createGenerateTaxNo, deleteGenerateTaxNo } from "../../controllers/Master/MasterGenerateTaxNo.js";

const router = express.Router();

router.get('/taxno/:id/:id2', getAllGenerateTaxNo);
router.post('/taxno', createGenerateTaxNo);
router.delete('/taxno', deleteGenerateTaxNo);

export default router;