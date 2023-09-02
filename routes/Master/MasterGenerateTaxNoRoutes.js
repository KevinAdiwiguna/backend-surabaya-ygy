import express from "express";
import { getAllGenerateTaxNo, createGenerateTaxNo, deleteGenerateTaxNo } from "../../controllers/Master/MasterGenerateTaxNo.js";

const router = express.Router();

router.get('/gtaxno', getAllGenerateTaxNo);
router.post('/gtaxno', createGenerateTaxNo);
router.delete('/gtaxno', deleteGenerateTaxNo);

export default router;