import express from "express";

const router = express.Router();

import { verifyUser } from "../../../middleware/AuthUser.js";
import { getAccount, createAccount, updateAccount, deleteAccount, getAccountByCode } from '../../../controllers/Master/GL/MasterAccount.js'

router.get('/account', getAccount);
router.post('/account', createAccount);
router.delete('/account/:id', deleteAccount);
router.patch('/account/:id', updateAccount);
router.get('/account/:id', getAccountByCode);

export default router;