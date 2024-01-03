import { createMasterBank, deleteMasterBank, getAllMasterBank, getMasterBankByCode, updateMasterBank } from "../../../../controllers/Master/ARAP/Bank/MasterBank.js";
import express from "express";

const router = express.Router();

router.get("/masterbank", getAllMasterBank);
router.get("/masterbank/:id", getMasterBankByCode);
router.post("/masterbank", createMasterBank);
router.patch("/masterbank/:id", updateMasterBank);
router.delete("/masterbank/:id", deleteMasterBank);

export default router;
