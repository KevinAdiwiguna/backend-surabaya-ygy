import express from "express";

const router = express.Router();

import { createCustomerPartner, getAllCustomerPartner, getCustomerPartnerByCustomerCode } from "../../controllers/Master/MasterCustomerPartner.js";

router.get("/customerpartner", getAllCustomerPartner);
router.post("/customerpartner", createCustomerPartner);
router.get("/customerpartner/:id", getCustomerPartnerByCustomerCode);

export default router;
