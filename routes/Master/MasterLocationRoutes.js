import express from "express";
import { createLocation, deleteLocation, getAllLocation, getLocationByCode } from '../../controllers/Master/MasterLocation.js'

const router = express.Router();

import { verifyUser, adminOnly } from "../../middleware/AuthUser.js";

router.get('/location',verifyUser, getAllLocation);
router.post('/location',verifyUser, createLocation);
router.delete('/location/:id',verifyUser, deleteLocation);
router.get('/location/:id',verifyUser, getLocationByCode);

export default router;