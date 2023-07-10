import express from "express";
import { createCountry, deleteCountry, getCountry, getCountryByCode, updateCountry } from '../../../controllers/Master/Customer/MasterCountry.js'

const router = express.Router();

import { verifyUser, adminOnly } from "../../../middleware/AuthUser.js"

router.get('/country', verifyUser, getCountry);
router.post('/country', verifyUser, createCountry);
router.patch('/country', verifyUser, updateCountry);
router.delete('/country/:id', verifyUser, deleteCountry);
router.get('/country/:id', verifyUser, getCountryByCode);

export default router;

