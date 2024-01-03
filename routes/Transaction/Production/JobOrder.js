import express from 'express'
import { getAllJobOrder, createJobOrder, getJobOrderByCode, deleteJobOrder, updateJobOrder } from '../../../controllers/Transaction/Production/JobOrder.js'

const router = express.Router();

router.get('/joborder', getAllJobOrder);
router.get('/joborder/:id', getJobOrderByCode);
router.post('/joborder', createJobOrder);
router.delete('/joborder/:id', deleteJobOrder);
router.patch('/joborder/:id', updateJobOrder);

export default router;
