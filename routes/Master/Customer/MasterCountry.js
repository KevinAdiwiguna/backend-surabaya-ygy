import express from "express";
import { createCountry, deleteCountry, getCountry, getCountryByCode } from '../../../controllers/Master/Customer/MasterCountry.js'

const router = express.Router();

router.get('/country', getCountry);
router.post('/country', createCountry);
router.delete('/country/:id', deleteCountry);
router.get('/country/:id', getCountryByCode);

export default router;

