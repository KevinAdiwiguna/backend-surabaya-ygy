import express from "express";
import { createSalesman, deleteSalesman, getAllSalesman, getSalesmanByCode } from '../../controllers/Master/MasterSalesman.js'

const router = express.Router();

router.get('/salesman', getAllSalesman);
router.post('/salesman', createSalesman);
router.delete('/salesman/:id', deleteSalesman);
router.get('/salesman/:id', getSalesmanByCode);

export default router;