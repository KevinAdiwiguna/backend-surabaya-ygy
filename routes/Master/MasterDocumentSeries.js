import express from "express";
import {
  createDocumentSeries,
  deleteSeriesModel,
  getAllSeries,
  getDocumentSeriesById,
  updateDocumentSeries,
  getSeriesByDocument,
  getSeriesPrice
} from "../../controllers/Master/MasterDocumentSeries.js";

const router = express.Router();

import { verifyUser } from "../../middleware/AuthUser.js";

router.get("/series", verifyUser, getAllSeries);
router.get("/seriesCode/:id", verifyUser, getSeriesByDocument);
router.patch("/series/:id", verifyUser, updateDocumentSeries);
// router.get('/seriesprice/:id', verifyUser, getDocumentSeriesById')
router.post("/series", verifyUser, createDocumentSeries);
router.delete("/series/:id", verifyUser, deleteSeriesModel);
router.get("/series/:id", verifyUser, getDocumentSeriesById);

export default router;
