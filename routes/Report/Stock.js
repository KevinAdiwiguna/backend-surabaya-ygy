import express from "express";
import {
  getStockByLocation
} from "../../controllers/Report/Stock.js";

const router = express.Router();

router.get('/stock/:id', getStockByLocation);

export default router;