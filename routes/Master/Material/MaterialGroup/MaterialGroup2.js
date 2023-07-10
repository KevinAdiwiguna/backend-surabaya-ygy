import express from "express";
import { createMaterialGroup, deleteMaterialGroup, getAllMaterialGroup, getMaterialGroupByCode, getMaterialGroup2ByCodeMaterialGroup1, updateMaterialGroup } from '../../../../controllers/Master/Material/MaterialGroup/MaterialGroup2.js'


const router = express.Router();

router.get("/materialgroup2", getAllMaterialGroup);
router.patch("/materialgroup2", updateMaterialGroup);
router.get("/materialgroup2Code/:id", getMaterialGroup2ByCodeMaterialGroup1);
router.post("/materialgroup2", createMaterialGroup);
router.delete("/materialgroup2/:id", deleteMaterialGroup);
router.get("/materialgroup2/:id", getMaterialGroupByCode);

export default router;
