import express from "express";
import { createSalesinvoice, goodsissueStatus, getAllDataSalesInvoice, getSalesInvoiceh, printInvoice } from "../../../../controllers/Transaction/Sales/SalesInvoice/SalesInvoice.js";

const router = express.Router();

router.get("/goodsissuestatus/:id", goodsissueStatus);
router.post("/salesinvoice", createSalesinvoice);
router.get("/salesinvoice", getSalesInvoiceh);
router.get("/salesinvoice/:id", getAllDataSalesInvoice);
router.patch("/printsalesinvoice/:id", printInvoice);

export default router;
