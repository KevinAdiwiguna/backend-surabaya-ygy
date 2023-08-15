import express from "express";

const router = express.Router();

import { getAllBomh, createBomh, deleteBomh, getBomhByCode, updateBomh } from "../../../../controllers/Master/Production/BOM/MasterBomh.js";

import { verifyUser } from "../../../../middleware/AuthUser.js";

router.get('/bomh', verifyUser, getAllBomh);
router.post('/bomh', verifyUser, createBomh);
router.delete('/bomh/:id', verifyUser, deleteBomh);
router.get('/bomh/:id', verifyUser, getBomhByCode);
router.patch('/bomh/:id', verifyUser, updateBomh);

export default router;

