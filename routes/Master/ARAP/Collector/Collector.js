import express from "express";

import { getAllCollector, createCollector, deleteCollector, getCollectorByCode, updateCollector } from "../../../../controllers/Master/ARAP/Collector/Collector.js";
const router = express.Router();

router.get("/collector", getAllCollector);
router.get("/collector/:id", getCollectorByCode);
router.delete("/collector/:id", deleteCollector);
router.patch("/collector", updateCollector);
router.post("/collector", createCollector);

export default router;
