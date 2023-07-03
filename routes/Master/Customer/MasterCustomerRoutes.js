import express from "express";
import { createCustomerGroup, deleteCustomerGroup, getCustomerGroup, getCustomerGroupByCode } from '../../../controllers/Master/Customer/MasterCustomer.js'

const router = express.Router();

router.get('/customer', getCustomerGroup);
router.post('/customer', createCustomerGroup);
router.delete('/customer/:id', deleteCustomerGroup);
router.get('/customer/:id', getCustomerGroupByCode);

export default router;