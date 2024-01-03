import express from "express";

const router = express.Router();

import { getAllWOrderTemplateh, createWOrderTemplateh, deleteWOrderTemplateh, updateWOrderTemplateh, getWOrderTemplatehByCode } from "../../../controllers/Master/Production/MasterWOrderTemplateH.js";

import { verifyUser } from "../../../middleware/AuthUser.js";

router.get('/woth', verifyUser, getAllWOrderTemplateh);
router.post('/woth', verifyUser, createWOrderTemplateh);
router.delete('/woth/:id', verifyUser, deleteWOrderTemplateh);
router.patch('/woth/:id', verifyUser, updateWOrderTemplateh);
router.get('/woth/:id', verifyUser, getWOrderTemplatehByCode);

export default router;
