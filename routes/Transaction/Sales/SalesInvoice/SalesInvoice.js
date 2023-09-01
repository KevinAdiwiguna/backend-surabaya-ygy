import express from "express";
import { createSalesinvoice, goodsissueStatus } from "../../../../controllers/Transaction/Sales/SalesInvoice/SalesInvoice.js";

const router = express.Router();

router.get("/goodsissuestatus/:id", goodsissueStatus);

export default router;
