import express from "express";
import { createSalesinvoice, goodsissueStatus, printInvoice } from "../../../../controllers/Transaction/Sales/SalesInvoice/SalesInvoice.js";

const router = express.Router();

router.get("/goodsissuestatus/:id", goodsissueStatus);
router.post("/salesinvoice", createSalesinvoice);
router.patch("/printsalesinvoice/:id", printInvoice);

export default router;
