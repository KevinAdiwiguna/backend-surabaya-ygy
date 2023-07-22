import express from "express";
import { createSalesman, deleteSalesman, getAllSalesman, getSalesmanByCode, updateSalesman } from '../../controllers/Master/MasterSalesman.js'

const router = express.Router();

import { verifyUser } from "../../middleware/AuthUser.js";

router.get('/salesman', getAllSalesman);
router.patch('/salesman', verifyUser, updateSalesman);
router.post('/salesman', createSalesman);
router.delete('/salesman/:id', verifyUser, deleteSalesman);
router.get('/salesman/:id', verifyUser, getSalesmanByCode);

export default router;