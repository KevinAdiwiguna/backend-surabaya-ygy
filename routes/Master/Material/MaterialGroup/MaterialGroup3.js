import express from "express";
import {
  createMaterialGroup,
  deleteMaterialGroup,
  getAllMaterialGroup,
  getMaterialGroupByCode,
  updateMaterialGroup,
  getAllMaterialGroupByGroup2
} from "../../../../controllers/Master/Material/MaterialGroup/MaterialGroup3.js";

const router = express.Router();

router.get("/materialgroup3", getAllMaterialGroup);
router.patch("/materialgroup3", updateMaterialGroup);
router.post("/materialgroup3", createMaterialGroup);
router.get("/materialgroup3Code/:id", getAllMaterialGroupByGroup2);
router.delete("/materialgroup3/:id", deleteMaterialGroup);
router.get("/materialgroup3/:id", getMaterialGroupByCode);

export default router;
