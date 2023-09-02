import express from "express";

const router = express.Router();

import { getAllMachIne, createMachIne, deleteMachIne, updateMachIne, getMachIneByCode } from "../../../controllers/Master/Production/MasterMachIne.js";

import { verifyUser } from "../../../middleware/AuthUser.js";

router.get('/machine', verifyUser, getAllMachIne);
router.post('/machine', verifyUser, createMachIne);
router.delete('/machine/:id', verifyUser, deleteMachIne);
router.patch('/machine/:id', verifyUser, updateMachIne);
router.get('/machine/:id', verifyUser, getMachIneByCode);

export default router;
