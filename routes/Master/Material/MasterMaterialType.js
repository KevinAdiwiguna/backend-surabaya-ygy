import express from "express";
import { createMaterialType, deleteMaterialType, getAllMaterialType, getMaterialTypeByCode } from '../../../controllers/Master/Material/MasterMaterialType.js'

const router = express.Router();

router.get('/materialtype', getAllMaterialType);
router.post('/materialtype', createMaterialType);
router.delete('/materialtype/:id', deleteMaterialType);
router.get('/materialtype/:id', getMaterialTypeByCode);

export default router;