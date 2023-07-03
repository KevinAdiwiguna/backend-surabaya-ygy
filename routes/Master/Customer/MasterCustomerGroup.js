import express from "express";
import { createCustomerGroup, deleteCustomerGroup, getCustomerGroup, getCustomerGroupByCode } from '../../../controllers/Master/Customer/MasterCostumerGroup.js'

const router = express.Router();

router.get('/cutomergroup', getCustomerGroup);
router.post('/cutomergroup', createCustomerGroup);
router.delete('/cutomergroup/:id', deleteCustomerGroup);
router.get('/cutomergroup/:id', getCustomerGroupByCode);

export default router;