import express from "express";

const router = express.Router();

import { getAllBomd, createBomd, deleteBomd, getBomdByCode, updateBomd } from "../../../../controllers/Master/Production/BOM/MasterBomd.js"

import { verifyUser } from "../../../../middleware/AuthUser.js";

router.get('/bomd', verifyUser, getAllBomd);
router.post('/bomd', verifyUser, createBomd);
router.delete('/bomd/:id/:id2', verifyUser, deleteBomd);
router.get('/bomd/:id/:id2', verifyUser, getBomdByCode);
router.patch('/bomd/:id/:id2', verifyUser, updateBomd);

export default router;