import express from "express";

const router = express.Router();

import { getAllBom } from "../../../controllers/Master/Production/MasterBillofMaterial.js"

router.get('/bom', getAllBom);

export default router;

