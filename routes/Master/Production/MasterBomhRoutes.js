import express from "express";

const router = express.Router();

import { getAllBomh, createBomh, deleteBomh, getBomhByCode, updateBomh } from "../../../controllers/Master/Production/MasterBomh.js";

router.get('/bomh', getAllBomh);
router.post('/bomh', createBomh);
router.delete('/bomh/:id', deleteBomh);
router.get('/bomh/:id', getBomhByCode);
router.patch('/bomh/:id', updateBomh);

export default router;

