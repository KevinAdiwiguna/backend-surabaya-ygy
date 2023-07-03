import express from "express";
import { createDocumentSeries, deleteSeriesModel, getAllSeries, getDocumentSeriesById } from '../../controllers/Master/MasterDocumentSeries.js'

const router = express.Router();

router.get('/series', getAllSeries);
router.post('/series', createDocumentSeries);
router.delete('/series/:id', deleteSeriesModel);
router.get('/series/:id', getDocumentSeriesById);

export default router;