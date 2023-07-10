import express from "express";
import { createSalesArea3, deleteSalesArea3, getAreaById, getSalesArea3, updateSalesArea3 } from '../../../../controllers/Master/Customer/SalesArea/SalesArea3.js';

const router = express.Router();

import { verifyUser, adminOnly } from "../../../../middleware/AuthUser.js";

router.get('/salesarea3', verifyUser, getSalesArea3);
router.post('/salesarea3', verifyUser, createSalesArea3);
router.patch('/salesarea3', verifyUser, updateSalesArea3);
router.delete('/salesarea3/:id', verifyUser, deleteSalesArea3);
router.get('/salesarea3/:id', verifyUser, getAreaById);


export default router