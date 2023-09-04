import express from "express";

import { getAllExchangeRate, getExhangeRateByCurrency, getExchangeRate, getExhangeRateByPeriode, createExchangeRateByCurrency, deleteExchangeRate, updateExchangeRate } from "../../../../controllers/Master/ARAP/ExchangeRate/MasterExchangeRate.js";
const router = express.Router();

router.get("/exchangerate", getAllExchangeRate);
router.get("/exchangeratep/:id", getExhangeRateByPeriode);
router.get("/exchangeratec/:id", getExhangeRateByCurrency);
router.get("/exchangerate/:id1/:id2", getExchangeRate);
router.post("/exchangerate", createExchangeRateByCurrency);
router.patch("/exchangerate/:id1/:id2", updateExchangeRate);
router.delete("/exchangerate/:id", deleteExchangeRate);

export default router;
