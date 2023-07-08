import express from "express";
import { createCountry, deleteCountry, getCountry, getCountryByCode } from '../../../controllers/Master/Customer/MasterCountry.js'

const router = express.Router();

import { verifyUser, adminOnly } from "../../../middleware/AuthUser.js"

router.get('/country',verifyUser, getCountry);
router.post('/country',verifyUser, createCountry);
router.delete('/country/:id',verifyUser, deleteCountry);
router.get('/country/:id',verifyUser, getCountryByCode);

export default router;

