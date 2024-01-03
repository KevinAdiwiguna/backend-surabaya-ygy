import express from "express";
import { createMaterial, deleteMaterial, getAllMasterMaterial, getMaterialByCode, updateMaterial, getMaterialByMaterialType } from "../../../controllers/Master/Material/MasterMaterial.js";

const router = express.Router();

router.get("/material", getAllMasterMaterial);
router.patch("/material/:id", updateMaterial);
router.post("/material", createMaterial);
router.delete("/material/:id", deleteMaterial);
router.get("/material/:id", getMaterialByCode);
router.get("/materialbytype/:id", getMaterialByMaterialType);

export default router;
