import express from "express";
import {
  createMaterialGroup,
  deleteMaterialGroup,
  getAllMaterialGroup,
  getMaterialGroupByCode,
} from "../../../../controllers/Master/Material/MaterialGroup/MaterialGroup3.js";

const router = express.Router();

router.get("/materialgroup3", getAllMaterialGroup);
router.post("/materialgroup3", createMaterialGroup);
router.delete("/materialgroup3/:id", deleteMaterialGroup);
router.get("/materialgroup3/:id", getMaterialGroupByCode);

export default router;
