import express from "express";
import { createSalesArea1, deleteSalesArea1, getAreaById, getSalesArea1,updateSalesArea1 } from '../../../../controllers/Master/Customer/SalesArea/SalesArea1.js'

const router = express.Router();

import { verifyUser } from "../../../../middleware/AuthUser.js";

router.get('/salesarea1',verifyUser, getSalesArea1);
router.post('/salesarea1',verifyUser, createSalesArea1);
router.patch('/salesarea1/:id',verifyUser, updateSalesArea1);
router.delete('/salesarea1/:id',verifyUser, deleteSalesArea1);
router.get('/salesarea1/:id',verifyUser, getAreaById);

export default router;



