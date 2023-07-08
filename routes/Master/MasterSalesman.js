import express from "express";
import { createSalesman, deleteSalesman, getAllSalesman, getSalesmanByCode } from '../../controllers/Master/MasterSalesman.js'

const router = express.Router();

import { verifyUser, adminOnly } from "../../middleware/AuthUser.js";

router.get('/salesman',verifyUser ,getAllSalesman);
router.post('/salesman',verifyUser, createSalesman);
router.delete('/salesman/:id',verifyUser, deleteSalesman);
router.get('/salesman/:id',verifyUser, getSalesmanByCode);

export default router;