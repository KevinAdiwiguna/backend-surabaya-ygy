import express from "express";
import { createLocation, deleteLocation, getAllLocation, getLocationByCode } from '../../controllers/Master/MasterLocation.js'

const router = express.Router();

router.get('/location', getAllLocation);
router.post('/location', createLocation);
router.delete('/location/:id', deleteLocation);
router.get('/location/:id', getLocationByCode);

export default router;