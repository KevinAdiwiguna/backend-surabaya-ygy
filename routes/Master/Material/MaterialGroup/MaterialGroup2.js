import express from "express";
import { createMaterialGroup,deleteMaterialGroup,getAllMaterialGroup,getMaterialGroupByCode } from '../../../../controllers/Master/Material/MaterialGroup/MaterialGroup2.js'


const router = express.Router();

router.get("/materialgroup2", getAllMaterialGroup);
router.post("/materialgroup2", createMaterialGroup);
router.delete("/materialgroup2/:id", deleteMaterialGroup);
router.get("/materialgroup2/:id", getMaterialGroupByCode);

export default router;
