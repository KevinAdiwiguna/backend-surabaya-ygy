import express from "express";

import { getAllTransactionType, getTransactionTypeByPurpose, createTransactionType, updateTransactionType, deleteTrnsactionType } from "../../../../controllers/Master/ARAP/TransactionType/MasterTransactionType.js";
const router = express.Router();

router.get("/transactiontype", getAllTransactionType);
router.get("/transactiontype/:id", getTransactionTypeByPurpose);
router.post("/transactiontype", createTransactionType);
router.patch("/transactiontype", updateTransactionType);
router.delete("/transactiontype/:id", deleteTrnsactionType);

export default router;
