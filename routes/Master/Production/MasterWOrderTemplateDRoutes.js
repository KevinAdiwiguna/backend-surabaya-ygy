import express from "express";

const router = express.Router();

import { getAllWOrderTemplated, createWOrderTemplated, deleteWOrderTemplated, updateWOrderTemplated, getWOrderTemplatedByCode } from "../../../controllers/Master/Production/MasterWOrderTemplateD.js";

import { verifyUser } from "../../../middleware/AuthUser.js";

router.get('/wot', verifyUser, getAllWOrderTemplated);
router.post('/wot', verifyUser, createWOrderTemplated);
router.delete('/wot/:id', verifyUser, deleteWOrderTemplated);
router.patch('/wot/:id', verifyUser, updateWOrderTemplated);
router.get('/wot/:id', verifyUser, getWOrderTemplatedByCode);

export default router;
