import express from "express";
import { createUnitConversion, deleteUnitConversion, getAllUnitConversion, getUnitConversionByMaterialCode, updateUnitConversion } from '../../../controllers/Master/Material/MasterUnitConversion.js'

const router = express.Router();

router.get('/unitconversion', getAllUnitConversion);
router.patch('/unitconversion', updateUnitConversion);
router.post('/unitconversion', createUnitConversion);
router.delete('/unitconversion/:id', deleteUnitConversion);
router.get('/unitconversion/:id', getUnitConversionByMaterialCode);

export default router;