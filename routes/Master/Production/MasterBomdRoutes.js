import express from "express";

const router = express.Router();

import { getAllBomd, createBomd, deleteBomd, getBomdByCode, updateBomd } from "../../../controllers/Master/Production/MasterBomd.js"

router.get('/bomd', getAllBomd);
router.post('/bomd', createBomd);
router.delete('/bomd/:id/:id2', deleteBomd);
router.get('/bomd/:id/:id2', getBomdByCode);
router.patch('/bomd/:id/:id2', updateBomd)

export default router;