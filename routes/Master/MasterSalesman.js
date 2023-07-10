import express from "express";
import { createSalesman, deleteSalesman, getAllSalesman, getSalesmanByCode, updateSalesman } from '../../controllers/Master/MasterSalesman.js'

const router = express.Router();

import { verifyUser, adminOnly } from "../../middleware/AuthUser.js";

router.get('/salesman', verifyUser, getAllSalesman);
router.patch('/salesman', verifyUser, updateSalesman);
router.post('/salesman', verifyUser, createSalesman);
router.delete('/salesman/:id', verifyUser, deleteSalesman);
router.get('/salesman/:id', verifyUser, getSalesmanByCode);

export default router;