import express from "express";

import { createDepartment, deleteDepartment, getAllDepartment, getDepartmentByCode, updateDepartment } from '../../controllers/Master/MasterDepartment.js'
const router = express.Router();

import { verifyUser } from "../../middleware/AuthUser.js";

router.get('/department', verifyUser, getAllDepartment);
router.patch('/department/:id', verifyUser, updateDepartment);
router.post('/department', verifyUser, createDepartment);
router.delete('/department/:id', verifyUser, deleteDepartment);
router.get('/department/:id', verifyUser, getDepartmentByCode);

export default router;