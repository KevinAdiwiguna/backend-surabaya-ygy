import express from "express";
import { createCustomerGroup, deleteCustomerGroup, getCustomerGroup, getCustomerGroupByCode } from '../../../controllers/Master/Customer/MasterCostumerGroup.js'

const router = express.Router();

import { verifyUser, adminOnly } from "../../../middleware/AuthUser.js"

router.get('/customergroup',verifyUser, getCustomerGroup);
router.post('/customergroup',verifyUser, createCustomerGroup);
router.delete('/customergroup/:id',verifyUser, deleteCustomerGroup);
router.get('/customergroup/:id',verifyUser, getCustomerGroupByCode);

export default router;