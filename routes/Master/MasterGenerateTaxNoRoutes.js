import express from "express";
import { getAllGenerateTaxNo } from "../../controllers/Master/MasterGenerateTaxNo.js";

const router = express.Router();

router.get('/gtaxno', getAllGenerateTaxNo);

export default router;