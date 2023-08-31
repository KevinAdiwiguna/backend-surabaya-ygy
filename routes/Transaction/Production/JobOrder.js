import express from 'express'
import { getAllJobOrder, createJobOrder, deleteJobOrder, updateJobOrder  } from '../../../controllers/Transaction/Production/JobOrder.js'

const router = express.Router();

router.get('/joborder', getAllJobOrder);
router.post('/joborder', createJobOrder);
router.delete('/joborder/:id', deleteJobOrder);
router.patch('/joborder/:id', updateJobOrder);

export default router;
