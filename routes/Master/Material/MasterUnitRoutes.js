import express from "express";
import { createUnit, deleteUnit, getAllUnit, getUnitByCode, updateUnit } from '../../../controllers/Master/Material/MasterUnit.js'

const router = express.Router();

router.get('/unit', getAllUnit);
router.patch('/unit', updateUnit);
router.post('/unit', createUnit);
router.delete('/unit/:id', deleteUnit);
router.get('/unit/:id', getUnitByCode);

export default router;