import express from "express";
import { createCustomerGroup, deleteCustomerGroup, getCustomerGroup, getCustomerGroupByCode, updateCustomerGroup } from '../../../controllers/Master/Customer/MasterCustomer.js'

const router = express.Router();

import { verifyUser } from "../../../middleware/AuthUser.js"

router.get('/customer', verifyUser, getCustomerGroup);
router.patch('/customer/:id', verifyUser, updateCustomerGroup);
router.post('/customer', verifyUser, createCustomerGroup);
router.delete('/customer/:id', verifyUser, deleteCustomerGroup);
router.get('/customer/:id', verifyUser, getCustomerGroupByCode);

export default router;