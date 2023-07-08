import express from "express";
import { createDocumentSeries, deleteSeriesModel, getAllSeries, getDocumentSeriesById } from '../../controllers/Master/MasterDocumentSeries.js'

const router = express.Router();

import { verifyUser, adminOnly } from "../../middleware/AuthUser.js";

router.get('/series',verifyUser, getAllSeries);
router.post('/series',verifyUser, createDocumentSeries);
router.delete('/series/:id', verifyUser,deleteSeriesModel);
router.get('/series/:id',verifyUser, getDocumentSeriesById);

export default router;