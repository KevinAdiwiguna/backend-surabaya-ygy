import express from "express";
import { createSalesArea2, deleteSalesArea2, getAreaById, getSalesArea2 } from '../../../../controllers/Master/Customer/SalesArea/SalesArea2.js'

const router = express.Router();

import { verifyUser, adminOnly } from "../../../../middleware/AuthUser.js";

router.get('/salesarea2',verifyUser, getSalesArea2);
router.post('/salesarea2',verifyUser, createSalesArea2);
router.delete('/salesarea2/:id',verifyUser, deleteSalesArea2);
router.get('/salesarea2/:id',verifyUser, getAreaById);

export default router;


