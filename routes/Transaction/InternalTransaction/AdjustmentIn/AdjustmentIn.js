import express from "express";
import { createAjIn, approveAJIn,printAjIn } from "../../../../controllers/Transaction/InternalTransaction/AdjustmentIn/AdjustmentIn.js";

const router = express.Router();

router.post('/adjustmentin', createAjIn);
router.patch('/adjustmentinaproved/:id', approveAJIn);
router.patch('/adjustmentinprint/:id', printAjIn);

export default router;