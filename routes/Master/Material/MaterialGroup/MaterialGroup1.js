import express from "express";
import { createMaterialGroup,deleteMaterialGroup,getAllMaterialGroup,getMaterialGroupByCode } from '../../../../controllers/Master/Material/MaterialGroup/MaterialGroup1.js'

const router = express.Router();

router.get('/materialgroup1', getAllMaterialGroup);
router.post('/materialgroup1', createMaterialGroup);
router.delete('/materialgroup1/:id', deleteMaterialGroup);
router.get('/materialgroup1/:id', getMaterialGroupByCode);

export default router;