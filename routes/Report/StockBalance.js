import express from "express";
import {
  getStockBalance
} from "../../controllers/Report/StockBalance.js";

const router = express.Router();

router.get('/stockbalance', getStockBalance);

export default router;