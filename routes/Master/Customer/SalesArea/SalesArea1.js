import express from "express";
import { createSalesArea1, deleteSalesArea1, getAreaById, getSalesArea1 } from '../../../../controllers/Master/Customer/SalesArea/SalesArea1.js'

const router = express.Router();

import { verifyUser, adminOnly } from "../../../../middleware/AuthUser.js";

router.get('/salesarea1',verifyUser, getSalesArea1);
router.post('/salesarea1',verifyUser, createSalesArea1);
router.delete('/salesarea1/:id',verifyUser, deleteSalesArea1);
router.get('/salesarea1/:id',verifyUser, getAreaById);

export default router;



