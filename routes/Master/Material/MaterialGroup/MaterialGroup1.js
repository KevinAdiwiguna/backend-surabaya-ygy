import express from "express";
import { createMaterialGroup,deleteMaterialGroup,getAllMaterialGroup,getMaterialGroupByCode,updateMaterialGroup } from '../../../../controllers/Master/Material/MaterialGroup/MaterialGroup1.js'

const router = express.Router();

import { verifyUser, adminOnly } from "../../../../middleware/AuthUser.js";

router.get('/materialgroup1',verifyUser, getAllMaterialGroup);
router.patch('/materialgroup1',verifyUser, updateMaterialGroup);
router.post('/materialgroup1',verifyUser, createMaterialGroup);
router.delete('/materialgroup1/:id',verifyUser, deleteMaterialGroup);
router.get('/materialgroup1/:id',verifyUser, getMaterialGroupByCode);

export default router;