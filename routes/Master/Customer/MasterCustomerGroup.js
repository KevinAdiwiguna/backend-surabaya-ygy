import express from "express";
import { createCustomerGroup, deleteCustomerGroup, getCustomerGroup, getCustomerGroupByCode } from '../../../controllers/Master/Customer/MasterCostumerGroup.js'

const router = express.Router();

router.get('/customergroup', getCustomerGroup);
router.post('/customergroup', createCustomerGroup);
router.delete('/customergroup/:id', deleteCustomerGroup);
router.get('/customergroup/:id', getCustomerGroupByCode);

export default router;